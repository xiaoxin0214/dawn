class Pipeline {
    constructor(device: GPUDevice, vertexSource: string, fragmentSource: string) {
        this.m_device = device;

        this.m_pipeline = device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: device.createShaderModule({
                    code: vertexSource,
                }),
                entryPoint: 'main',

                buffers: [
                    {
                        arrayStride: 16,
                        attributes: [
                            {
                                shaderLocation: 0,
                                offset: 0,
                                format: 'float32x4',
                            },
                        ],
                    },
                ],
            },
            fragment: {
                module: device.createShaderModule({
                    code: fragmentSource,
                }),
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