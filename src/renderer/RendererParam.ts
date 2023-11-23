class RendererParam {
    constructor() {
        this.powerPreference = "high-performance";
        this.sampleCount = 1;
    }

    public powerPreference: GPUPowerPreference;
    public containerID: string | undefined;
    public sampleCount: number;
}

export default RendererParam;