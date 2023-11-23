import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";
import Vector3 from "../math/Vector3";
import { float } from "../base/Type";

/**
 * represents a Ellipsoid defined by the equation (x/a)^2+(y/b)^2+(z/c)^2=1
 */
class Ellipsoid extends BaseObject implements ICloneable<Ellipsoid>
{
    /**
     * creates a new Ellipsoid object by the given radii
     * @param x the radius in the x direction
     * @param y the radius in the y direction
     * @param z the radius in the z direction
     */
    constructor(x: float = 0.0, y: float = 0.0, z: float = 0.0) {
        super();
        this.radii = new Vector3(x, y, z);
        this.radiiSquared = new Vector3(x * x, y * y, z * z);
        this.oneOverRadii = new Vector3(x === 0 ? 0.0 : 1.0 / x, y === 0 ? 0.0 : 1.0 / y, z === 0 ? 0.0 : 1.0 / z);
        this.oneOverRadiiSquared = new Vector3(x === 0 ? 0.0 : 1.0 / x / x, y === 0 ? 0.0 : 1.0 / y / y, z === 0 ? 0.0 : 1.0 / z / z);
        this.minRadius = Math.min(x, y, z);
        this.maxRadius = Math.max(x, y, z);
    }

    /**
     * returns a string that represents the current ellipsoid
     * @returns the string representing the current ellipsoid
     */
    toString(): string {
        return this.radii.toString();
    }

    /**
     * determines the current ellipsoid is equal to the given ellipsoid
     * @param rhs the right hand side ellipsoid object
     * @returns true if the current ellipsoid is equal to the given ellipsoid
     */
    equals(rhs: this): boolean {
        return this.radii.equals(rhs.radii);
    }

    /**
     * create a new Ellipsoid object copied from the current ellipsoid
     * @returns a new Ellipsoid object
     */
    clone(): Ellipsoid {
        return new Ellipsoid(this.radii.x, this.radii.y, this.radii.z);
    }

    /**
     * the radii of the ellipsoid
     */
    public radii: Vector3;
    /**
     * the squared radii of the ellipsoid
     */
    public radiiSquared: Vector3;
    /**
     * one over the radii of the ellipsoid
     */
    public oneOverRadii: Vector3;
    /**
     * one over the squared radii of the ellipsoid
     */
    public oneOverRadiiSquared: Vector3;
    /**
     * the min radius of the ellipsoid
     */
    public minRadius: float;
    /**
     * the max radius of the ellipsoid
     */
    public maxRadius: float;

    /**
     * An Ellipsoid instance initialized to the WGS84
     */
    static WGS84: Ellipsoid = new Ellipsoid(6378137.0, 6378137.0, 6356752.3142451793);
}

export default Ellipsoid;