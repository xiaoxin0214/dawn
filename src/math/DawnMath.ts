import { float } from "../base/Type"
class DawnMath {
    /**
     * PI
     */
    static PI: float = Math.PI;
    /**
     * 1.0/PI
     */
    static ONE_OVER_PI = 1.0 / Math.PI;
    /**
     * the number of radians in a degree
     */
    static RADIANS_PER_DEGREE: float = Math.PI / 180.0;
    /**
     * the number of degrees in a radian
     */
    static DEGREES_PER_RADIAN: float = 180 / Math.PI;

    /**
     * convert radians to degrees
     * @param radians the angle to convert in radians
     * @returns the corresponding angle in degrees
     */
    static ToDgrees(radians: float): float {
        return DawnMath.DEGREES_PER_RADIAN * radians;
    }

    /**
     * convert degrees to radians
     * @param degrees the angle to convert in degrees
     * @returns the corresponding angle in radians
     */
    static ToRadians(degrees: float): float {
        return DawnMath.RADIANS_PER_DEGREE * degrees;
    }
}

export default DawnMath;