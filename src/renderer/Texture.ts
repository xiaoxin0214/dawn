import { int } from "../base/Type";
class Texture {
    constructor(device: GPUDevice, width: int, height: int, data: ImageBitmap | undefined=undefined) {
        this.m_device = device;
        this.m_texture = device.createTexture({
            size: [width, height, 1],
            format: 'rgba8unorm',
            usage:
                GPUTextureUsage.TEXTURE_BINDING |
                GPUTextureUsage.COPY_DST |
                GPUTextureUsage.RENDER_ATTACHMENT,
        });

        if (data) {
            this.setData(data);
        }
    }

    setData(data: ImageBitmap) {
        this.m_device.queue.copyExternalImageToTexture(
            { source: data },
            { texture: this.m_texture },
            [data.width, data.height]
        );
    }

    get texture() {
        return this.m_texture;
    }

    private m_device: GPUDevice;
    private m_texture: GPUTexture;

}

export default Texture;