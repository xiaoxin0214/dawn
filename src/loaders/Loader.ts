class Loader {
    constructor(basePath: string = "") {
        this.m_basePath = basePath;
    }

    load(url: string, onSucceed: Function, onError: Function) {

    }

    loadAsync(url: string): Promise<any> {
        let scope = this;
        return new Promise(function (resolve: Function, reject: Function) {
            scope.load(url, resolve, reject);
        })
    }

    get basePath() {
        return this.m_basePath;
    }

    set basePath(value: string) {
        this.m_basePath = value;
    }

    private m_basePath: string;
}

export default Loader;