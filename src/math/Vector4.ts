import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";
import { float } from "../base/Type";

/**
 * represents a vector contains four coordinates
 */
class Vector4 extends BaseObject implements ICloneable<Vector4>
{
    /**
     * creates a new Vector4 object from the given x,y,z,w components
     * @param x the x component
     * @param y the y component 
     * @param z the z component
     * @param w the w component
     */
    constructor(x: float = 0, y: float = 0, z: float = 0, w: float = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * add the given Vector4 object to the current the Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the current updated Vector4 object
     */
    add(vec4: Vector4): this {
        this.x += vec4.x;
        this.y += vec4.y;
        this.z += vec4.z;
        this.w += vec4.w;

        return this;
    }

    /**
     * subtract the given Vector4 object from the current the Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the current updated Vector4 object
     */
    subtract(vec4: Vector4): this {
        this.x -= vec4.x;
        this.y -= vec4.y;
        this.z -= vec4.z;
        this.w -= vec4.w;
        return this;
    }

    /**
     * multiplies the current Vector4 object by the given Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the current updated Vector4 object
     */
    multiply(vec4: Vector4): this {
        this.x *= vec4.x;
        this.y *= vec4.y;
        this.z *= vec4.z;
        this.w *= vec4.w;
        return this;
    }

    /**
     * divides the current Vector4 object by the given Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the current updated Vector4 object
     */
    divide(vec4: Vector4): this {
        if (vec4.x === 0 || vec4.y === 0 || vec4.z === 0 || vec4.z === 0)
            throw new Error("divide by zero");

        this.x /= vec4.x;
        this.y /= vec4.y;
        this.z /= vec4.z;
        this.w /= vec4.w;
        return this;
    }

    /**
     * multiplies the current object by the given scaleFactor
     * @param scaleFactor the scale factor
     * @returns the current updated object
     */
    scale(scaleFactor: float): this {
        this.x *= scaleFactor;
        this.y *= scaleFactor;
        this.z *= scaleFactor;
        this.w *= scaleFactor;
        return this;
    }

    /**
     * negates the current vector
     * @returns the current updated vector
     */
    negate(): this {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
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
        this.w /= length;
        return this;
    }

    /**
     * gets the dot product of the current Vector4 object and the given object
     * @param vec4 the other Vector4 object
     * @returns the dot product
     */
    dot(vec4:Vector4):number{
        return Vector4.Dot(this,vec4);
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
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    /**
     * returns the distance between the current Vector4 object and the given Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the distance
     */
    distanceTo(vec4: Vector4): number {
        return Vector4.Distance(this, vec4);
    }

    /**
     * returns the squared distance between the current Vector4 object and the given Vector4 object
     * @param vec4 the other Vector4 object
     * @returns the squared distance
     */
    squaredDistanceTo(vec4: Vector4): number {
        return Vector4.SquaredDistance(this, vec4);
    }

    /**
     * returns a string that represents the current Vector4 object
     * @returns the string representing the current Vector4 object
     */
    toString(): string {
        return `{x:${this.x},y:${this.y},z:${this.z},w:${this.w}}`;
    }

    /**
     * determines whether the current Vector4 object is equal to the given "rhs" Vector4 object
     * @param rhs the right hand side object
     * @returns true if the current Vector4 object is equal to the "rhs" Vector4 object
     */
    equals(rhs: this): boolean {
        return this.x === rhs.x && this.y === rhs.y && this.z === rhs.z && this.w === rhs.w;
    }

    /**
     * creates a new Vector4 object copied from the current Vector4 object
     * @returns a new Vector4 object
     */
    clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * gets the distance between the "value1" Vector4 object and the "value2" Vector4 object
     * @param value1 the first Vector4 object
     * @param value2 the second Vector4 object
     * @returns the distacne
     */
    static Distance(value1: Vector4, value2: Vector4): number {
        return Math.sqrt(Vector4.SquaredDistance(value1, value2));
    }

    /**
     * gets the squared distance between the "value1" Vector4 object and the "value2" Vector4 object
     * @param value1 the first Vector4 object
     * @param value2 the second Vector4 object
     * @returns the squared distacne
     */
    static SquaredDistance(value1: Vector4, value2: Vector4): number {
        const sub = value1.clone();
        sub.subtract(value2);
        return sub.squaredLength();
    }

    /**
     * returns the dot product of the "value1" Vector4 object and the "value2" Vector4 object
     * @param value1 the first Vector4 object
     * @param value2 the first Vector4 object
     * @returns the dot product
     */
    static Dot(value1: Vector4, value2: Vector4): number {
        return value1.x * value2.x + value1.y * value2.y + value1.z * value2.z + value1.w * value2.w;
    }

    /**
     * x component
     */
    public x: float;
    /**
     * y component
     */
    public y: float;
    /**
     * z component
     */
    public z: float;
    /**
     * w component
     */
    public w: float;
}

export default Vector4