import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";

export type Vector2Constructor<T extends Vector2> = new (...args: ConstructorParameters<typeof Vector2>) => T;

/**
 * represent a vector contains two coordinates
 */
class Vector2 extends BaseObject implements ICloneable {
    /**
     * create a new Vector2 object from the given x,y component
     * @param x x component
     * @param y y component
     */
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
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
     * x component
     */
    public x: number;
    /**
     * y component
     */
    public y: number;
}

export default Vector2;