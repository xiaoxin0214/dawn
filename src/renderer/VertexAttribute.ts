class VertexAttribute {
    constructor(format: GPUVertexFormat, name: string = "") {
        this.name = name;
        this.format = format;
    }

    getSize(): GPUSize64 {
        switch (this.format) {
            case "float32": return 4;
            case "float32x2": return 4 * 2;
            case "float32x3": return 4 * 3;
            case "float32x4": return 4 * 4;
            case "sint32": return 4;
            case "sint32x2": return 4 * 2;
            case "sint32x3": return 4 * 3;
            case "sint32x4": return 4 * 4;
            case "uint32": return 4;
            case "uint32x2": return 4 * 2;
            case "uint32x3": return 4 * 3;
            case "uint32x4": return 4 * 4;
            case "uint8x2": return 1 * 2;
            case "uint8x4": return 1 * 4;
        }

        throw new Error(`暂不支持的format${this.format}`);
    }


    public name: string;
    public format: GPUVertexFormat;
}

export default VertexAttribute;