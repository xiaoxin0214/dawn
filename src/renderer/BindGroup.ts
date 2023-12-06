class BindGroup
{
    constructor(device:GPUDevice)
    {
        this.m_device=device;
    }

    public bindGroup!: GPUBindGroup;
    private m_device:GPUDevice;

}