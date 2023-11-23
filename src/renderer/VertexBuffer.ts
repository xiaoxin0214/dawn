class VertexBuffer {
    constructor(device: GPUDevice, viewOrSize: ArrayBufferView | number) {
        this.m_device = device;
        const view = viewOrSize as ArrayBufferView;
        const isView = view.byteLength !== undefined;
        let alignedLength = isView ? view.byteLength : viewOrSize as number;
        alignedLength = (alignedLength + 3) & ~3;
        const vertexBufferDescription: GPUBufferDescriptor =
        {
            size: alignedLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: false
        };

        this.m_buffer = this.m_device.createBuffer(vertexBufferDescription);

        if (isView) {
            this.setData(view);
        }

    }

    setData(src: ArrayBufferView) {
        const buffer = this.m_buffer;

        let byteLength = src.byteLength;
        byteLength = Math.min(byteLength, buffer.size);

        let chunkStart = src.byteOffset;
        let chunkEnd = chunkStart + byteLength;

        const alignedLength = (byteLength + 3) & ~3;
        if (alignedLength !== byteLength) {
            const tempView = new Uint8Array(src.buffer.slice(chunkStart, chunkEnd));
            src = new Uint8Array(alignedLength);
            (src as Uint8Array).set(tempView);
            chunkStart = 0;
            chunkEnd = alignedLength;
            byteLength = alignedLength;
        }

        const maxChunk = 1024 * 1024 * 15;
        let offset = 0;
        while (chunkEnd - (chunkStart + offset) > maxChunk) {
            this.m_device.queue.writeBuffer(buffer, offset, src.buffer, chunkStart + offset, maxChunk);
            offset += maxChunk;
        }

        this.m_device.queue.writeBuffer(buffer, offset, src.buffer, chunkStart + offset, byteLength - offset);
    }

    destroy() {
        this.m_buffer.destroy();
    }

    get buffer() {
        return this.m_buffer;
    }

    private m_buffer: GPUBuffer;
    private m_device: GPUDevice;
}

export default VertexBuffer;