import Loader from "./Loader";

class ImageBitmapLoader extends Loader {
    load(url: string, onSucceed: Function, onError: Function): void {
        url = this.basePath + url;
        fetch(url)
            .then((res) => {
                return res.blob()
            }).then((blob) => {
                return createImageBitmap(blob);
            }).then((bitmap) => {
                onSucceed(bitmap)
            })
            .catch((error) => {
                onError(error);
            });
    }
}

export default ImageBitmapLoader;