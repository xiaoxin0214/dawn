class HtmlUtil {
    static CreateElementNS(name: string): HTMLElement {
        return document.createElementNS('http://www.w3.org/1999/xhtml', name);
    }
}

export default HtmlUtil;