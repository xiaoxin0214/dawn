import { int } from "../base/Type";
import Texture from "./Texture";
class Texture2D extends Texture {
    constructor(device: GPUDevice, width: int, height: int, data: ImageBitmap | undefined = undefined) {
        super(device);
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

    createView():GPUTextureView
    {
        return this.m_texture.createView();
    }

}

export default Texture2D;