import VertexAttribute from "./VertexAttribute";

class VertexBufferLayout {
    constructor(vertexAttributes: Array<VertexAttribute>) {
        this.innerCreateGPUBufferLayout(vertexAttributes);
    }

    get bufferLayout() {
        return this.m_bufferLayout;
    }

    static CreateGPUVertexBufferLayoutLst(vbLayoutLst:Array<VertexBufferLayout>):Array<GPUVertexBufferLayout>
    {
        const res:Array<GPUVertexBufferLayout>=[];
        for(let i=0;i<vbLayoutLst.length;++i)
        {
            res.push(vbLayoutLst[i].bufferLayout);
        }

        return res;

    }

    private innerCreateGPUBufferLayout(vertexAttributes: Array<VertexAttribute>) {
        let arrayStride: GPUSize64 = 0;
        let offset: GPUSize64 = 0;

        const attributes: Array<GPUVertexAttribute> = [];
        for (let i = 0; i < vertexAttributes.length; ++i) {
            attributes.push({
                format: vertexAttributes[i].format,
                offset: offset,
                shaderLocation: i,
            });

            arrayStride += vertexAttributes[i].getSize();
            offset += vertexAttributes[i].getSize();
        }

        this.m_bufferLayout = {
            arrayStride: arrayStride,
            attributes: attributes
        }
    }

    private m_bufferLayout!: GPUVertexBufferLayout;
}

export default VertexBufferLayout;