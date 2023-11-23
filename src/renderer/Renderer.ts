import RendererParam from "./RendererParam";
import RendererAPI from "./RendererAPI";
import RenderContext from "./RenderContext";

class Renderer {
    constructor(params: RendererParam) {
        this.m_renderContext = new RenderContext();
        this.m_rendererAPI = new RendererAPI(params);
    }

    async init() {
        return this.m_rendererAPI.init();
    }

    set isClearColor(value: boolean) {
        this.m_renderContext.isClearColor = value
    }

    get isClearColor() {
        return this.m_renderContext.isClearColor;
    }

    set isClearDepth(value: boolean) {
        this.m_renderContext.isClearDepth = value
    }

    get isClearDepth() {
        return this.m_renderContext.isClearDepth;
    }

    set isClearStencil(value: boolean) {
        this.m_renderContext.isClearStencil = value
    }

    get isClearStencil() {
        return this.m_renderContext.isClearStencil;
    }

    set clearColor(value: GPUColor) {
        this.m_renderContext.clearColor = value
    }

    get clearColor() {
        return this.m_renderContext.clearColor;
    }

    get clearDepth() {
        return this.m_renderContext.clearDepth;
    }

    set clearDepth(value: number) {
        this.m_renderContext.clearDepth = value
    }

    get clearStencil() {
        return this.m_renderContext.clearStencil;
    }

    set clearStencil(value: number) {
        this.m_renderContext.clearStencil = value
    }

    beginScene() {
        this.m_rendererAPI.beginRender(this.m_renderContext);
        this.m_rendererAPI.drawRect(this.m_renderContext);
    }

    endScene() {
        this.m_rendererAPI.endRender(this.m_renderContext);
    }

    private m_renderContext: RenderContext;
    private m_rendererAPI;
}

export default Renderer;