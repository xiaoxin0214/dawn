/**
 * support cloning,which creates a new obejct with the same value as the current object 
 */
interface ICloneable<T extends ICloneable<T>> {
    /**
     * creates a new object copied from the current object
     */
    clone(): T;
}

export default ICloneable;