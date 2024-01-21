abstract class Texture {
    constructor(device: GPUDevice) {
        this.m_device = device;
    }

    get texture() {
        return this.m_texture;
    }

    abstract createView():GPUTextureView;

    protected m_device: GPUDevice;
    protected m_texture!: GPUTexture;
}

export default Texture;