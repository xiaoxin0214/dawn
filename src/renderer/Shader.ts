class Shader {
    constructor(device: GPUDevice, vs: string, fs: string) {
        this.m_vs = vs;
        this.m_fs = fs;
        this.m_device = device;
    }

    getVertexShaderModule(): GPUShaderModule {
        return this.m_device.createShaderModule({ code: this.m_vs });
    }

    getFragmentShaderModule(): GPUShaderModule {
        return this.m_device.createShaderModule({ code: this.m_fs });
    }

    private m_device: GPUDevice;
    private m_vs: string;
    private m_fs: string;
}

export default Shader;