import IDisposable from "../base/IDisposable";

class UniformBuffer implements IDisposable {

    constructor(device: GPUDevice) {
        this.m_device = device;
        this.m_uniformLocationTable = new Map();
    }

    addUniform(name: string, data: number[]) {
        if (this.m_uniformLocationTable.has(name))
            return;

        const size = data.length;
    }

    dispose(): void {
    }

    private m_device: GPUDevice;
    private m_uniformLocationTable: Map<string, number>;
}

export default UniformBuffer;