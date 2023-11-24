import Shader from "./Shader";
import VertexBufferLayout from "./VertexBufferLayout";

class Pipeline {
    constructor(device: GPUDevice, shader: Shader, vbLayoutLst: Array<VertexBufferLayout>) {
        this.m_device = device;

        this.m_pipeline = device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: shader.getVertexShaderModule(),
                entryPoint: 'main',

                buffers: VertexBufferLayout.CreateGPUVertexBufferLayoutLst(vbLayoutLst),
            },
            fragment: {
                module: shader.getFragmentShaderModule(),
                entryPoint: 'main',
                targets: [
                    {
                        format: "rgba8unorm",
                    },
                ],
            },
            primitive: {
                topology: 'triangle-list',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8',
            },
        });
    }

    get pipeline() {
        return this.m_pipeline;
    }

    private m_device: GPUDevice;
    private m_pipeline: GPURenderPipeline
}

export default Pipeline;