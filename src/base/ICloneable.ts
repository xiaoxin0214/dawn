/**
 * support cloning,which creates a new obejct with the same value as the current object 
 */
interface ICloneable {
    /**
     * creates a new object copied from the current object
     */
    clone(): this;
}

export default ICloneable;