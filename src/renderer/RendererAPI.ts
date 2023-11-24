import RendererParam from "./RendererParam";
import Vector2 from "../math/Vector2";
import RenderContext from "./RenderContext";
import IndexBuffer from "./IndexBuffer";
import VertexBuffer from "./VertexBuffer";
import Pipeline from "./Pipeline";
import VertexBufferLayout from "./VertexBufferLayout";
import VertexAttribute from "./VertexAttribute";
import Shader from "./Shader";

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

    drawRect(renderContext: RenderContext) {
        const currentPass = renderContext.currentPass;
        const device = this.m_device;
        if (!currentPass || !device)
            return;

        const vertexSrc = `
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
            output.Position = pos;
            output.color = color;
            return output;
        }`;
        const fragmentSrc = `@fragment
        fn main(  @location(0) color: vec4<f32>) -> @location(0) vec4<f32> {
          return color;
        }`;
        const vertices = new Float32Array(6 * 4 * 2);
        vertices.set([
            -0.5, -0.5, 0, 1, 1.0, 0.0, 0.0, 1.0,
            0.5, -0.5, 0, 1, 0.0, 1.0, 0.0, 1.0,
            -0.5, 0.5, 0, 1, 0.0, 0.0, 1.0, 1.0,
            0.5, -0.5, 0, 1, 1.0, 0.0, 0.0, 1.0,
            0.5, 0.5, 0, 1, 0.0, 1.0, 0.0, 10.0,
            -0.5, 0.5, 0, 1, 0.0, 0.0, 1.0, 1.0,]);
        const vb = new VertexBuffer(device, vertices);
        const vertexBufferLayout = new VertexBufferLayout([new VertexAttribute('float32x4', "a_pos"), new VertexAttribute('float32x4', "a_color")]);
        const shader = new Shader(device, vertexSrc, fragmentSrc);
        const pipeline = new Pipeline(device, shader, [vertexBufferLayout]);
        currentPass.setPipeline(pipeline.pipeline);
        currentPass.setVertexBuffer(0, vb.buffer);
        currentPass.draw(vertices.length / 8);
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