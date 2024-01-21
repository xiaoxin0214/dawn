import Loader from "./Loader"
import HtmlUtil from "../base/HtmlUtil";
class ImageLoader extends Loader {
    constructor(basePath: string = "") {
        super(basePath);
    }

    load(url: string, onSucceed: Function, onError: Function): void {
        url = this.basePath + url;
        const image: HTMLImageElement = HtmlUtil.CreateElementNS("img") as HTMLImageElement;

        function onImageLoad(event: Event) {
            removeEventListeners();
            onSucceed(event.target);
        }

        function onImageError(event: ErrorEvent) {
            removeEventListeners();
            onError(event);
        }

        function removeEventListeners() {
            image.removeEventListener('load', onImageLoad, false);
            image.removeEventListener('error', onImageError, false);
        }

        image.addEventListener('load', onImageLoad, false);
        image.addEventListener('error', onImageError, false);

        image.src = url;
    }
}

export default ImageLoader;