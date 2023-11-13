/**
 * the base class of the other classes in dawn
 */
abstract class BaseObject {
    /**
     * returns a string that represent the current object
     * @returns the string that represent the current object 
     */
    abstract toString(): string;

    /**
     * determines whether the specified object is equal to the current object
     * @param rhs the other object to compare with the current object
     * @returns true if rhs is equal to the current object
     */
    abstract equals(rhs: this): boolean;
}

export default BaseObject;