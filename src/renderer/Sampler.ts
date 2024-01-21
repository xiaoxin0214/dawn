class Sampler {
    constructor(device: GPUDevice, addressModeU: GPUAddressMode = "clamp-to-edge", addressModeV: GPUAddressMode = "clamp-to-edge", minFilter: GPUFilterMode = "linear", magFilter: GPUFilterMode = "linear") {
        this.m_device = device;
        this.m_sampler = this.m_device.createSampler({
            addressModeU: addressModeU,
            addressModeV: addressModeV,
            minFilter: minFilter,
            magFilter: magFilter
        });
    }

    get sampler() {
        return this.m_sampler;
    }
    private m_device: GPUDevice;
    private m_sampler: GPUSampler;
}

export default Sampler;