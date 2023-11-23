import { float } from "../base/Type"
import DawnMath from "../math/DawnMath"
import Vector3 from "../math/Vector3"

/**
 * represents a position defined by longitude, latitude and height
 */
class Cartographic extends Vector3 {
    /**
     * create a new Cartographic object by given parameters
     * @param longitude the longitude,in radians
     * @param latitude the latitude,in radians
     * @param height the height,in meters, above the ellipsoid
     */
    constructor(longitude: float=0, latitude: float=0, height: float = 0) {
        super(longitude, latitude, height);
    }

    /**
     * set the current Cartographic objcect values by the given parameters
     * @param longitude the longitude, in degrees
     * @param latitude the latitude, in degrees
     * @param height the height, in meters, above the ellipsoid
     * @returns the current updated object
     */
    fromDegrees(longitude: float, latitude: float, height: float): this {
        this.longitude = DawnMath.ToRadians(longitude);
        this.latitude = DawnMath.ToRadians(latitude);
        this.height = height;
        return this;
    }

    /**
     * get the longitude, in radians
     */
    get longitude() {
        return this.x;
    }

    /**
     * set the longitude, in radians
     */
    set longitude(value: float) {
        this.x = value;
    }

    /**
     * get the latitude, in radians
     */
    get latitude() {
        return this.y;
    }

    /**
     * set the latitude, in radians
     */
    set latitude(value: float) {
        this.y = value;
    }

    /**
     * get the height, in meters, above the ellipsoid
     */
    get height() {
        return this.z;
    }

    /**
     * set the height, in meters, above the ellipsoid
     */
    set height(value: float) {
        this.z = value;
    }
}

export default Cartographic;