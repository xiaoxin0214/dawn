import IDisposable from "../base/IDisposable";
import Matrix4 from "../math/Matrix4";

class UniformInfo {
    constructor(size: number, location: number = 0) {
        this.size = size;
        this.location = location;
    }

    public location: number;
    public size: number;
}

class UniformBuffer implements IDisposable {

    constructor(device: GPUDevice) {
        this.m_device = device;
        this.m_isDirty = false;
        this.m_uniformLocationPointer = 0;
        this.m_data = [];
        this.m_uniformLocationTable = new Map();
    }

    addUniform(name: string, data: number[]) {
        if (this.m_uniformLocationTable.has(name))
            return;

        const size = data.length;
        this.innerFillAlignment(size);
        this.m_uniformLocationTable.set(name, new UniformInfo(size, this.m_uniformLocationPointer));
        for (let i = 0; i < size; i++) {
            this.m_data.push(data[i]);
        }
        this.m_isDirty = true;
    }

    addMatrix4(name:string,matrix:Matrix4):void
    {
        this.addUniform(name,matrix.toArray());
    }

    dispose(): void {
    }

    get buffer():GPUBuffer {
        if(this.m_isDirty)
        {
            this.innerFillAlignment(4);
            let bufferData=new Float32Array(this.m_data);
            const uniformBufferDescription: GPUBufferDescriptor =
            {
                size: bufferData.byteLength,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                mappedAtCreation: false
            };
    
            this.m_buffer = this.m_device.createBuffer(uniformBufferDescription);

            this.innerSetData(bufferData);
        }
        
        return this.m_buffer;
    }

    private innerFillAlignment(size: number) {
        let alignment;
        if (size <= 2) {
            alignment = size;
        } else {
            alignment = 4;
        }

        if (this.m_uniformLocationPointer % alignment !== 0) {
            const oldPointer = this.m_uniformLocationPointer;
            this.m_uniformLocationPointer += alignment - (this.m_uniformLocationPointer % alignment);
            const diff = this.m_uniformLocationPointer - oldPointer;

            for (let i = 0; i < diff; i++) {
                this.m_data.push(0);
            }
        }
    }

    private innerSetData(src: ArrayBufferView) {
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

    private m_device: GPUDevice;
    private m_isDirty: boolean;
    private m_uniformLocationPointer: number;
    private m_uniformLocationTable: Map<string, UniformInfo>;
    private m_data: number[];
    private m_buffer!: GPUBuffer;
}

export default UniformBuffer;