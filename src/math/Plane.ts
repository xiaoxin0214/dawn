import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";
import Vector3 from "./Vector3";
/**
 * represents a plane defined by the equation ax+by+cz+d=0
 */
class Plane extends BaseObject implements ICloneable {
    /**
     * create a new Plane object from the given floats
     * @param a the a component of the plane
     * @param b the b component of the plane
     * @param c the c component of the plane
     * @param d the d component of the plane
     */
    constructor(a: number, b: number, c: number, d: number) {
        super();
        this.normal = new Vector3(a, b, c);
        this.distance = d;

        const length = this.normal.length();
        this.normal.normalize();
        if (length !== 0)
            this.distance /= length;
    }

    /**
     * returns the signed shortest distance of the given point to the current Plane object, 
     * if the distance is positive, the point is in the half-space in the direction of the normal,
     * if the distance is zero, the point is on the plane
     * @param pnt the point
     * @returns the signed shortest distance of the given point to the current Plane object 
     */
    distanceToPoint(pnt: Vector3): number {
        return pnt.dot(this.normal) + this.distance;
    }

    /**
     * project the point onto the current Plane object
     * @param pnt the point
     * @returns the point on the current plane
     */
    projectPoint(pnt: Vector3): Vector3 {
        const distance = this.distanceToPoint(pnt);
        const scaledNormal = this.normal.clone().scale(distance);
        return pnt.clone().subtract(scaledNormal);
    }

    /**
     * returns a string that represents the current Plane object
     * @returns a string representing the current Plane obejct
     */
    toString(): string {
        return `{normal:${this.normal.toString()},distance:${this.distance}}`
    }
    /**
     * determines whether the current object is equal to the given object
     * @param rhs the right hand side object
     * @returns true if the current object is equal to the "rhs" Plane object
     */
    equals(rhs: this): boolean {
        return this.distance === rhs.distance && this.normal.equals(rhs.normal);
    }
    /**
     * creates a new Plane object copied from the current Plane object
     * @returns a new Plane object
     */
    clone(): this {
        return this.constructor(this.normal.x, this.normal.y, this.normal.z, this.distance);
    }

    /**
     * create a new Plane object from a normal and a point on the plane
     * @param normal the normal of the plane
     * @param pnt the point on the plane
     * @returns a new plane object
     */
    static FromNormalAndPoint(normal: Vector3, pnt: Vector3): Plane {
        const normalizedNormal = normal.clone().normalize();
        const distance = -pnt.dot(normalizedNormal);
        return new Plane(normalizedNormal.x, normalizedNormal.y, normalizedNormal.z, distance);
    }

    /**
     * create a new Plane object from three points on the plane
     * @param pnt1 the point on the plane
     * @param pnt2 the point on the plane
     * @param pnt3 the point on the plane
     * @returns a new plane object
     */
    static FromPoints(pnt1:Vector3,pnt2:Vector3,pnt3:Vector3):Plane
    {
        const vec1=pnt2.clone().subtract(pnt1);
        const vec2=pnt3.clone().subtract(pnt1);
        return Plane.FromNormalAndPoint(Vector3.Cross(vec1,vec2),pnt1);
    }

    public normal: Vector3;
    public distance: number;
}

export default Plane;