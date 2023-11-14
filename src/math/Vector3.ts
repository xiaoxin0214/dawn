import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";

export type Vector3LikeConstructor<T extends Vector3> = new (...args: ConstructorParameters<typeof Vector3>) => T;
/**
 * represent a vector contains 3 components
 */
class Vector3 extends BaseObject implements ICloneable {
    /**
     * create a new Vector3 object from given x,y,z components
     * @param x the x component
     * @param y the y component
     * @param z the z component
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * add the given Vector3 object to the current object
     * @param vec3 the other Vector3 object
     * @returns the current updated Vector3 object
     */
    add(vec3: Vector3): this {
        this.x += vec3.x;
        this.y += vec3.y;
        this.z += vec3.z;
        return this;
    }

    /**
     * subtracts the given Vector3 object from the current Vector3 object
     * @param vec3 the other Vector3 object
     * @returns the current updated Vector3 object
     */
    subtract(vec3: Vector3): this {
        this.x -= vec3.x;
        this.y -= vec3.y;
        this.z -= vec3.z;
        return this;
    }

    /**
     * multiplies the current Vector3 object by the given Vector3 object
     * @param vec3 the other Vector3 object
     * @returns the current updated object
     */
    multiply(vec3: Vector3): this {
        this.x *= vec3.x;
        this.y *= vec3.y;
        this.z *= vec3.z;
        return this;
    }

    /**
     * divides the current Vector3 object by the given Vector3 object
     * @param vec3 the other Vector3 object
     * @returns the current updated object
     */
    divide(vec3: Vector3): this {
        if (vec3.x === 0 || vec3.y === 0 || vec3.z === 0) {
            throw new Error("divide by zero");
        }

        this.x /= vec3.x;
        this.y /= vec3.y;
        this.z /= vec3.z;
        return this;
    }

    /**
     * negate the current vector
     * @returns the current updated object
     */
    negate(): this {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * returns the length of the vector
     * @returns the length of the vector
     */
    length(): number {
        return Math.sqrt(this.squaredLength());
    }

    /**
     * returns the squared length of the vector
     * @returns the squared length of the vector
     */
    squaredLength(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * normalize the current object
     * @returns the current updated object
     */
    normalize(): this {
        const length = this.length();
        if (length === 0) {
            return this;
        }

        this.x /= length;
        this.y /= length;
        this.z /= length;
        return this;
    }

    /**
     * returns the distance between the current Vector3 object and the given Vector3 object
     * @param vec3 the other Vector3 object
     * @returns the distance
     */
    distanceTo(vec3:Vector3):number
    {
        return Vector3.Distance(this,vec3);
    }

    /**
     * returns the squared distance between the current Vector3 object and the given Vector3 object
     * @param vec3 the other Vector3 object
     * @returns the squared distance
     */
    squaredDistanceTo(vec3:Vector3):number
    {
        return Vector3.SquaredDistance(this,vec3);
    }

    /**
     * multiplies the current object by the given scale
     * @param scaleFactor the scale factor
     * @returns the current updated object
     */
    scale(scaleFactor: number): this {
        this.x *= scaleFactor;
        this.y *= scaleFactor;
        this.z *= scaleFactor;
        return this;
    }

    /**
     * gets the dot product of the current Vector3 object and the given object
     * @param vec3 the other Vector3 object
     * @returns the dot product
     */
    dot(vec3:Vector3):number{
        return Vector3.Dot(this,vec3);
    }

    /**
     * returns a string that represent the current Vector3 object
     * @returns the string representing the current Vector3 object
     */
    toString(): string {
        return `{x:${this.x},y:${this.y},z:${this.z}}`
    }

    /**
     * determins whether the current object is equal to the given object
     * @param vec3 the other object
     * @returns true if the current object is equal to the given object
     */
    equals(vec3: this): boolean {
        return Vector3.Equals(this, vec3);
    }

    /**
     * create a new Vector3 object copied from the current object
     * @returns a new Vector3 object
     */
    clone(): this {
        return new (this.constructor as Vector3LikeConstructor<this>)(this.x, this.y, this.z);
    }

    /**
     * determins whether the "lhs" Vector3 object is equal to the "rhs" Vector3 object
     * @param lhs the left hand side object
     * @param rhs the right hand side object
     * @returns true if the "lhs" object is equal to the "rhs" object
     */
    static Equals(lhs: Vector3, rhs: Vector3): boolean {
        return lhs.x === rhs.x && lhs.y == rhs.y && lhs.z === rhs.z;
    }

    /**
     * gets the distance between the "value1" Vector3 object and the "value2" Vector3 object
     * @param value1 the first Vector3 object
     * @param value2 the second Vector3 object
     * @returns the distacne
     */
    static Distance(value1:Vector3,value2:Vector3):number{
        return Math.sqrt(Vector3.SquaredDistance(value1,value2));
    }

    /**
     * gets the squared distance between the "value1" Vector3 object and the "value2" Vector3 object
     * @param value1 the first Vector3 object
     * @param value2 the second Vector3 object
     * @returns the squared distacne
     */
    static SquaredDistance(value1:Vector3,value2:Vector3):number
    {
        const sub=value1.clone();
        sub.subtract(value2);
        return sub.squaredLength();
    }

    /**
     * returns the dot product of the "value1" Vector3 object and the "value2" Vector3 object
     * @param value1 the first Vector3 object
     * @param value2 the first Vector3 object
     * @returns the dot product
     */
    static Dot(value1:Vector3,value2:Vector3):number{
        return value1.x*value2.x+value1.y*value2.y+value1.z*value2.z;
    }

    /**
     * returns the cross product of the "value1" Vector3 object and the "value2" Vector3 object
     * @param value1 the first Vector3 object
     * @param value2 the first Vector3 object
     * @returns the cross product
     */
    static Cross(value1:Vector3,value2:Vector3):Vector3{
        const x = value1.y * value2.z - value1.z * value2.y;
        const y = value1.z * value2.x - value1.x * value2.z;
        const z = value1.x * value2.y - value1.y * value2.x;
        return new Vector3(x,y,z);
    }

    /**
     * x component
     */
    public x: number;
    /**
     * y component
     */
    public y: number;
    /**
     * z component
     */
    public z: number;
}


export default Vector3;