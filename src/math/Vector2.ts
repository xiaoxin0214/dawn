import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";

export type Vector2Constructor<T extends Vector2> = new (...args: ConstructorParameters<typeof Vector2>) => T;

/**
 * represent a vector contains two components
 */
class Vector2 extends BaseObject implements ICloneable {
    /**
     * create a new Vector2 object from the given x,y component
     * @param x x component
     * @param y y component
     */
    constructor(x: number = 0.0, y: number = 0.0) {
        super();
        this.x = x;
        this.y = y;
    }

    /**
     * adds the given Vector2 object to the current Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the current updated object
     */
    add(vec2: this): this {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }

    /**
     * subtracts the given Vector2 object from the current Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the current updated object
     */
    subtract(vec2: this): this {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    }

    /**
     * multiplies the current Vector2 object by the given Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the current updated Vector2 object
     */
    multiply(vec2: this): this {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    }

    /**
     * divides the current Vector2 object by the given Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the current updated object
     */
    divide(vec2: this): this {
        if (vec2.x === 0 || vec2.y === 0) {
            throw new Error("divide by zero");
        }

        this.x /= vec2.x;
        this.y /= vec2.y;
        return this;
    }

    /**
     * nagate the current Vector2
     * @returns the current updated object
     */
    negate(): this {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * multiplies the current Vector2 object by given scale
     * @param scale the scale factor
     * @returns the current updated object
     */
    scale(scale: number): this {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    /**
     * gets the length of the vector
     * @returns the length of the vector
     */
    length(): number {
        return Math.sqrt(this.squaredLength());
    }

    /**
     * gets the squared length of the vector
     * @returns the squared length of the vector
     */
    squaredLength(): number {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * gets the distance between the current Vector2 object and the given Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the distance
     */
    distanceTo(vec2: Vector2): number {
        return Vector2.Distance(this, vec2);
    }

    /**
     * gets the squared distance between the current Vector2 object and the given Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the squared distance
     */
    squaredDistanceTo(vec2: Vector2): number {
        return Vector2.SquaredDistance(this, vec2);
    }

    /**
     * get the dot product of the current Vector2 object and the given Vector2 object
     * @param vec2 the other Vector2 object
     * @returns the dot product
     */
    dot(vec2: Vector2): number {
        return Vector2.Dot(this, vec2);
    }

    /**
     * normalize the vector
     * @returns the current object
     */
    normalize(): this {
        const length = this.length();
        if (length === 0) {
            return this;
        }
        this.x /= length;
        this.y /= length;
        return this;
    }

    /**
     * returns a string that represent the current object
     * @returns a string representing the current object
     */
    toString(): string {
        return `{x:${this.x},y:${this.y}}`;
    }

    /**
     * determines wheter the "rhs" Vector2 object is equal to the current Vector2 object
     * @param rhs the right hand side object
     * @returns true if the "rhs" object is equal to the current object
     */
    equals(rhs: this): boolean {
        return Vector2.Equals(this, rhs);
    }

    /**
     * create a new Vector2 object copied from the current object
     * @returns a new Vector2
     */
    clone(): this {
        return new (this.constructor as Vector2Constructor<this>)(this.x, this.y);
    }

    /**
     * determines whether the "lhs" Vector2 object is equals the "rhs" Vector2 object
     * @param lhs left hand side object
     * @param rhs right hand side object
     * @returns true if the "lhs" object is equal to the "rhs" object
     */
    static Equals(lhs: Vector2, rhs: Vector2): boolean {
        return lhs.x === rhs.x && lhs.y === rhs.y;
    }

    /**
     * gets the distance between the "value1" vector and the "value2" vector
     * @param value1 the first Vector2 object
     * @param value2 the second Vector2 object
     * @returns the distance
     */
    static Distance(value1: Vector2, value2: Vector2): number {
        return Math.sqrt(this.SquaredDistance(value1, value2));
    }

    /**
     * gets the squared distance between the "value1" vector and the "value2" vector
     * @param value1 the first Vector2 object
     * @param value2 the second Vector2 object
     * @returns the squared distance
     */
    static SquaredDistance(value1: Vector2, value2: Vector2): number {
        const sub = value1.clone().subtract(value2);
        return sub.squaredLength();
    }

    /**
     * gets the dot product of the "value1" vector and the "value2" vector
     * @param value1 the first Vector2 object
     * @param value2 the second Vector2 object
     * @returns the dot product
     */
    static Dot(value1: Vector2, value2: Vector2): number {
        return value1.x * value2.x + value1.y * value2.y;
    }

    /**
     * x component
     */
    public x: number;
    /**
     * y component
     */
    public y: number;
}

export default Vector2;