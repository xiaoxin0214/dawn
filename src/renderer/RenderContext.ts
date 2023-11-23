class RenderContext {
    constructor() {
        this.m_isClearColor = true;
        this.m_clearColor = { r: 0.0, g: 0.0, b: 0.0, a: 1.0 };
        this.m_isClearDepth = true;
        this.m_clearDepth = 1;
        this.m_isClearStencil = true;
        this.m_clearStencil = 0;
    }

    set isClearColor(value: boolean) {
        this.m_isClearColor = value
    }

    get isClearColor() {
        return this.m_isClearColor;
    }

    set isClearDepth(value: boolean) {
        this.m_isClearDepth = value
    }

    get isClearDepth() {
        return this.m_isClearDepth;
    }

    set isClearStencil(value: boolean) {
        this.m_isClearStencil = value
    }

    get isClearStencil() {
        return this.m_isClearStencil;
    }

    set clearColor(value: GPUColor) {
        this.m_clearColor = value
    }

    get clearColor() {
        return this.m_clearColor;
    }

    get clearDepth() {
        return this.m_clearDepth;
    }

    set clearDepth(value: number) {
        this.m_clearDepth = value
    }

    get clearStencil() {
        return this.m_clearStencil;
    }

    set clearStencil(value: number) {
        this.m_clearStencil = value
    }

    get currentPass() {
        return this.m_currentPass;
    }

    set currentPass(value: GPURenderPassEncoder | undefined) {
        this.m_currentPass = value
    }

    get currentEncoder() {
        return this.m_currentEncoder;
    }

    set currentEncoder(value: GPUCommandEncoder | undefined) {
        this.m_currentEncoder = value
    }

    private m_isClearColor: boolean;
    private m_clearColor: GPUColor;

    private m_isClearDepth: boolean;
    private m_clearDepth: number;

    private m_isClearStencil: boolean;
    private m_clearStencil: number;

    private m_currentPass: GPURenderPassEncoder | undefined;
    private m_currentEncoder: GPUCommandEncoder | undefined;
}

export default RenderContext;