class IndexBuffer {
    constructor(device: GPUDevice, count: GPUSize64, format: GPUIndexFormat = "uint16") {
        this.m_device = device;
        const indexBufferDescription =
        {
            size: this.calculateBufferSize(count, format),
            usage: GPUBufferUsage.INDEX,
        };
        this.m_buffer = this.m_device.createBuffer(indexBufferDescription);
        this.m_format = format;
    }

    destroy() {
        this.m_buffer.destroy();
    }

    private calculateBufferSize(count: GPUSize64, format: GPUIndexFormat): GPUSize64 {
        if ("uint16" == format) {
            return count * 2;
        }
        else if ("uint32" == format) {
            return count * 4;
        }
        else {
            throw new Error(`暂不支持的类型${format}`);
        }
    }

    get buffer() {
        return this.m_buffer;
    }

    get format() {
        return this.m_format;
    }

    private m_buffer: GPUBuffer;
    private m_format: GPUIndexFormat;
    private m_device: GPUDevice;

}

export default IndexBuffer;