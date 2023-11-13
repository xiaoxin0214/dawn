/**
 * provides a mechanism for releasing unmanaged resources
 */
interface IDisposable {
    /**
     * releases unmanaged resources
     */
    dispose(): void;
}

export default IDisposable;