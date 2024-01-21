import { int } from "../base/Type";
import Texture from "./Texture";

class CubeTexture extends Texture {
    constructor(device: GPUDevice, width: int, height: int, datas: Array<ImageBitmap> | undefined = undefined) {
        super(device);
        this.m_texture = device.createTexture({
            dimension: '2d',
            size: [width, height, 6],
            format: 'rgba8unorm',
            usage:
                GPUTextureUsage.TEXTURE_BINDING |
                GPUTextureUsage.COPY_DST |
                GPUTextureUsage.RENDER_ATTACHMENT,
        });

        if (datas) {
            this.setData(datas);
        }
    }

    setData(datas: Array<ImageBitmap>) {
        for (let i = 0; i < datas.length; i++) {
            const imageBitmap = datas[i];
            this.m_device.queue.copyExternalImageToTexture(
                { source: imageBitmap },
                { texture: this.m_texture, origin: [0, 0, i] },
                [imageBitmap.width, imageBitmap.height]
            );
        }
    }

    createView(): GPUTextureView {
        return this.m_texture.createView({ dimension: 'cube'});
    }
}

export default CubeTexture;