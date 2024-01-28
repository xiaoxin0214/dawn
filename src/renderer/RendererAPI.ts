import RendererParam from "./RendererParam";
import Vector2 from "../math/Vector2";
import RenderContext from "./RenderContext";
import IndexBuffer from "./IndexBuffer";
import VertexBuffer from "./VertexBuffer";
import Pipeline from "./Pipeline";
import VertexBufferLayout from "./VertexBufferLayout";
import VertexAttribute from "./VertexAttribute";
import Shader from "./Shader";
import UniformBuffer from "./UniformBuffer";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
import DawnMath from "../math/DawnMath";
import Cube from "../geometries/Cube";
import Sampler from "./Sampler";
import Texture2D from "./Texture2D";
import ImageBitmapLoader from "../loaders/ImageBitmapLoader";
import CubeTexture from "./CubeTexture";

let myBitMap: any = undefined;
let myBitMapRequesting = false;
let myCubeBitMaps: any = undefined;
let myCubeBitMapsRequesting = false;
const imgSrcs = [
    './assets/skybox/right.jpg',
    './assets/skybox/left.jpg',
    './assets/skybox/top.jpg',
    './assets/skybox/bottom.jpg',
    './assets/skybox/front.jpg',
    './assets/skybox/back.jpg',
  ];
let cubeTexture:any =undefined;
class RendererAPI {
    constructor(params: RendererParam) {
        this.m_params = params;
        this.m_width = 0;
        this.m_height = 0;
        this.m_pixelRatio = window.devicePixelRatio;
    }

    async init() {
        this.innerCreateCanvasElement();

        if (!this.m_canvasElement) {
            throw new Error("canvas元素未创建!");
        }

        const adapterOptions = {
            powerPreference: this.m_params.powerPreference
        };

        const adapter = await navigator.gpu.requestAdapter(adapterOptions);
        if (null == adapter) {
            throw new Error("创建适配器失败!");
        }

        const device = await adapter.requestDevice({});
        this.m_adapter = adapter;
        this.m_device = device;

        this.m_context = this.m_canvasElement.getContext("webgpu");
        if (!this.m_context) {
            throw new Error("context对象未初始化!");
        }

        this.m_context.configure({
            device: this.m_device,
            format: "rgba8unorm",
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
            alphaMode: 'premultiplied'
        });

        this.innerConfigCanvasSize();
        this.innerCreateColorBuffer();

        const bufferSize = this.getDrawingBufferSize();
        const depthTextureDescriptor: GPUTextureDescriptor = {
            label: "defaultDepthTexture",
            size: {
                width: bufferSize.x,
                height: bufferSize.y,
            },
            sampleCount: 1,
            dimension: "2d",
            format: "depth24plus-stencil8",
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT
        };

        this.m_depthTexture = this.m_device.createTexture(depthTextureDescriptor);
    }

    beginRender(renderContext: RenderContext) {
        if (!this.m_context || !this.m_device || !this.m_depthTexture) {
            throw new Error("对象未初始化");
        }

        let colorAttachmentLoadOp: GPULoadOp = "load";
        let colorAttachmentStoreOp: GPUStoreOp = "store";
        if (renderContext.isClearColor) {
            colorAttachmentLoadOp = "clear";
            colorAttachmentStoreOp = "store";
        }

        const colorTextureView = this.m_context.getCurrentTexture().createView();
        const depthTextureView = this.m_depthTexture.createView();
        const descriptor: GPURenderPassDescriptor = {
            colorAttachments: [{
                view: colorTextureView,
                clearValue: renderContext.clearColor,
                loadOp: colorAttachmentLoadOp,
                storeOp: colorAttachmentStoreOp,
            }],
            depthStencilAttachment: {
                view: depthTextureView
            }
        };

        const depthStencilAttachment = descriptor.depthStencilAttachment;
        if (depthStencilAttachment) {
            if (renderContext.isClearDepth) {
                depthStencilAttachment.depthClearValue = renderContext.clearDepth;
                depthStencilAttachment.depthLoadOp = "clear";
                depthStencilAttachment.depthStoreOp = "store";
            }
            else {
                depthStencilAttachment.depthLoadOp = "load";
                depthStencilAttachment.depthStoreOp = "store";
            }

            if (renderContext.isClearStencil) {
                depthStencilAttachment.stencilClearValue = renderContext.clearStencil;
                depthStencilAttachment.stencilLoadOp = "clear";
                depthStencilAttachment.stencilStoreOp = "store"
            }
            else {
                depthStencilAttachment.stencilLoadOp = "load";
                depthStencilAttachment.stencilStoreOp = "store"
            }
        }

        renderContext.currentEncoder = this.m_device.createCommandEncoder();
        renderContext.currentPass = renderContext.currentEncoder.beginRenderPass(descriptor);
    }

    endRender(renderContext: RenderContext) {
        if (!this.m_device || !renderContext.currentPass || !renderContext.currentEncoder)
            return;

        renderContext.currentPass.end();
        this.m_device.queue.submit([renderContext.currentEncoder.finish()]);

    }

    drawTexturedCube(renderContext: RenderContext) {
        if (!myBitMap) {
            if (!myBitMapRequesting) {
                let imageBitmapLoader = new ImageBitmapLoader();
                imageBitmapLoader.loadAsync("./Di-3d.png").then((res) => {
                    myBitMap = res;
                });
                myBitMapRequesting = true;
            }

            return;
        }

        const currentPass = renderContext.currentPass;
        const device = this.m_device;
        if (!currentPass || !device)
            return;

        const vertexSrc = `
        struct Uniforms {
            modelViewProjectionMatrix : mat4x4<f32>,
        }
        @binding(0) @group(0) var<uniform> uniforms : Uniforms;

        struct VertexOutput {
            @builtin(position) Position : vec4<f32>,
            @location(0) fragUV : vec2<f32>,
            @location(1) fragPosition: vec4<f32>,
          }

        @vertex
        fn main(
          @location(0) pos : vec4<f32>,
          @location(1) color : vec4<f32>,
          @location(2) uv : vec2<f32>
        ) -> VertexOutput {
            var output : VertexOutput;
            output.Position = uniforms.modelViewProjectionMatrix * pos;
            output.fragUV = uv;
            output.fragPosition = 0.5 * (pos + vec4(1.0, 1.0, 1.0, 1.0));
            return output;
        }`;
        const fragmentSrc = `@group(0) @binding(1) var mySampler: sampler;
        @group(0) @binding(2) var myTexture: texture_2d<f32>;
        @fragment
        fn main(@location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32>) -> @location(0) vec4<f32> {
            return textureSample(myTexture, mySampler, fragUV) * fragPosition;
        }`;

        let cube = new Cube();
        const vertices = cube.getVertices();
        const mvpMatrix = Matrix4.MakePerspective((2 * Math.PI) / 5,
            this.m_width / this.m_height,
            1,
            100.0);

        mvpMatrix.multiply(new Matrix4().fromTranslation(new Vector3(1.5, 0, -4)));
        const vb = new VertexBuffer(device, vertices);
        const ub = new UniformBuffer(device);
        const now = Date.now() / 1000;
        mvpMatrix.multiply(new Matrix4().fromRotationAxis(new Vector3(1, 1, 1).normalize(), Math.sin(now) * DawnMath.PI));
        ub.addMatrix4("mvpMatrix", mvpMatrix);
        const vertexBufferLayout = new VertexBufferLayout(cube.getAttributes());
        const shader = new Shader(device, vertexSrc, fragmentSrc);
        const sampler = new Sampler(device);
        const texture = new Texture2D(device, myBitMap.width, myBitMap.height, myBitMap);
        const pipeline = new Pipeline(device, shader, [vertexBufferLayout]);
        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: ub.buffer,
                    },
                },
                {
                    binding: 1,
                    resource: sampler.sampler,
                },
                {
                    binding: 2,
                    resource: texture.createView(),
                },
            ],
        });
        currentPass.setPipeline(pipeline.pipeline);
        currentPass.setBindGroup(0, uniformBindGroup);
        currentPass.setVertexBuffer(0, vb.buffer);
        currentPass.draw(vertices.length / 10);
    }

    drawCube(renderContext: RenderContext) {
        const currentPass = renderContext.currentPass;
        const device = this.m_device;
        if (!currentPass || !device)
            return;

        const vertexSrc = `
        struct Uniforms {
            modelViewProjectionMatrix : mat4x4<f32>,
        }
        @binding(0) @group(0) var<uniform> uniforms : Uniforms;

        struct VertexOutput {
            @builtin(position) Position : vec4<f32>,
            @location(0) color : vec4<f32>,
          }

        @vertex
        fn main(
          @location(0) pos : vec4<f32>,
          @location(1) color : vec4<f32>
        ) -> VertexOutput {
            var output : VertexOutput;
            output.Position = uniforms.modelViewProjectionMatrix * pos;
            output.color = color;
            return output;
        }`;
        const fragmentSrc = `@fragment
        fn main(  @location(0) color: vec4<f32>) -> @location(0) vec4<f32> {
          return color;
        }`;

        let cube = new Cube();
        const vertices = cube.getVertices();
        const mvpMatrix = Matrix4.MakePerspective((2 * Math.PI) / 5,
            this.m_width / this.m_height,
            1,
            100.0);

        mvpMatrix.multiply(new Matrix4().fromTranslation(new Vector3(-1.5, 0, -4)));
        const vb = new VertexBuffer(device, vertices);
        const ub = new UniformBuffer(device);
        const now = Date.now() / 1000;
        mvpMatrix.multiply(new Matrix4().fromRotationAxis(new Vector3(1, 1, 1).normalize(), Math.sin(now) * DawnMath.PI));
        ub.addMatrix4("mvpMatrix", mvpMatrix);
        const vertexBufferLayout = new VertexBufferLayout(cube.getAttributes());
        const shader = new Shader(device, vertexSrc, fragmentSrc);
        const pipeline = new Pipeline(device, shader, [vertexBufferLayout]);
        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: ub.buffer,
                    },
                },
            ],
        });
        currentPass.setPipeline(pipeline.pipeline);
        currentPass.setBindGroup(0, uniformBindGroup);
        currentPass.setVertexBuffer(0, vb.buffer);
        currentPass.draw(vertices.length / 10);
    }

    drawCubeMap(renderContext: RenderContext)
    {
        const currentPass = renderContext.currentPass;
        const device = this.m_device;
        if (!currentPass || !device)
            return;
        if (!myCubeBitMaps) {
            if (!myCubeBitMapsRequesting) {
                let imageBitmapLoader = new ImageBitmapLoader();
                const promises = imgSrcs.map(async (src) => {
                    return imageBitmapLoader.loadAsync(src);
                  });
                  Promise.all(promises).then((res) => {
                    myCubeBitMaps = res;
                    cubeTexture = new CubeTexture(device, myCubeBitMaps[0].width, myCubeBitMaps[0].height, myCubeBitMaps);
                });
                myCubeBitMapsRequesting = true;
            }

            return;
        }

        const vertexSrc = `
        struct Uniforms {
            modelViewProjectionMatrix : mat4x4<f32>,
        }
        @binding(0) @group(0) var<uniform> uniforms : Uniforms;

        struct VertexOutput {
            @builtin(position) Position : vec4<f32>,
            @location(0) fragUV : vec2<f32>,
            @location(1) fragPosition: vec4<f32>,
          }

        @vertex
        fn main(
          @location(0) pos : vec4<f32>,
          @location(1) color : vec4<f32>,
          @location(2) uv : vec2<f32>
        ) -> VertexOutput {
            var output : VertexOutput;
            output.Position = uniforms.modelViewProjectionMatrix * pos;
            output.fragUV = uv;
            output.fragPosition = 0.5 * (pos + vec4(1.0, 1.0, 1.0, 1.0));
            return output;
        }`;
        const fragmentSrc = `@group(0) @binding(1) var mySampler: sampler;
        @group(0) @binding(2) var myTexture: texture_cube<f32>;
        
        @fragment
        fn main(
          @location(0) fragUV: vec2<f32>,
          @location(1) fragPosition: vec4<f32>
        ) -> @location(0) vec4<f32> {
          var cubemapVec = fragPosition.xyz - vec3(0.5);
          return textureSample(myTexture, mySampler, cubemapVec);
        }
        `;

        let cube = new Cube();
        const vertices = cube.getVertices();
        const now = Date.now() / 800;
        const mvpMatrix = Matrix4.MakePerspective((2 * Math.PI) / 5,
            this.m_width / this.m_height,
            1,
            3000.0);
        const modelMatrix = new Matrix4().fromScale(new Vector3(1000, 1000, 1000));
        const viewMatrix = new Matrix4().fromRotationAxis(new Vector3(1, 0, 0), Math.sin(now) * DawnMath.PI/10);
        viewMatrix.multiply(new Matrix4().fromRotationAxis(new Vector3(0, 1, 0), now * 0.2));
        mvpMatrix.multiply(viewMatrix.multiply(modelMatrix));

        const vb = new VertexBuffer(device, vertices);
        const ub = new UniformBuffer(device);

        ub.addMatrix4("mvpMatrix", mvpMatrix);
        const vertexBufferLayout = new VertexBufferLayout(cube.getAttributes());
        const shader = new Shader(device, vertexSrc, fragmentSrc);
        const sampler = new Sampler(device);

        const pipeline = new Pipeline(device, shader, [vertexBufferLayout]);
        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: ub.buffer,
                    },
                },
                {
                    binding: 1,
                    resource: sampler.sampler,
                },
                {
                    binding: 2,
                    resource: cubeTexture.createView(),
                },
            ],
        });
        currentPass.setPipeline(pipeline.pipeline);
        currentPass.setBindGroup(0, uniformBindGroup);
        currentPass.setVertexBuffer(0, vb.buffer);
        currentPass.draw(vertices.length / 10);
    }

    getDrawingBufferSize(): Vector2 {
        return new Vector2(this.m_width * this.m_pixelRatio, this.m_height * this.m_pixelRatio);
    }

    private innerCreateColorBuffer() {
        if (!this.m_device) {
            throw new Error("device对象未初始化!");
        }

        if (this.m_colorBuffer) this.m_colorBuffer.destroy();

        const { x, y } = this.getDrawingBufferSize();

        this.m_colorBuffer = this.m_device.createTexture({
            label: 'colorBuffer',
            size: {
                width: x,
                height: y,
                depthOrArrayLayers: 1
            },
            sampleCount: this.m_params.sampleCount,
            format: "rgba8unorm",
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
        });
    }

    private innerConfigCanvasSize() {
        if (!this.m_canvasElement) {
            throw new Error("canvas元素未创建!");
        }
        this.m_width = this.m_canvasElement.clientWidth;
        this.m_height = this.m_canvasElement.clientHeight;

        this.m_canvasElement.width = this.m_width * this.m_pixelRatio;
        this.m_canvasElement.height = this.m_height * this.m_pixelRatio;
    }

    private innerCreateCanvasElement() {
        if (!this.m_params.containerID) {
            throw new Error("containerID未定义!");
        }

        const container = document.getElementById(this.m_params.containerID);
        if (!container) {
            throw new Error("containerID非法!");
        }

        this.m_canvasElement = document.createElement("canvas");
        this.m_canvasElement.style.width = "100%";
        this.m_canvasElement.style.height = "100%";
        container.appendChild(this.m_canvasElement);
    }

    private m_params: RendererParam;
    private m_adapter: GPUAdapter | undefined;
    private m_device: GPUDevice | undefined;
    private m_context: GPUCanvasContext | null | undefined;
    private m_colorBuffer: GPUTexture | null | undefined;

    private m_canvasElement: HTMLCanvasElement | undefined;
    private m_width: number;
    private m_height: number;
    private m_pixelRatio: number;

    private m_depthTexture: GPUTexture | undefined;
}

export default RendererAPI;