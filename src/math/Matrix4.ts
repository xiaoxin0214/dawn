import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";
import { float, FloatArray } from "../base/Type";
import Vector3 from "./Vector3";

/**
 * a 4*4 matrix,stored in column-major order array
 */
class Matrix4 extends BaseObject implements ICloneable<Matrix4> {
    /**
     * create a new Matrix4 object from the given elements,in row-major order for code readability
     * @param row0column0 
     * @param row0column1 
     * @param row0column2 
     * @param row0column3 
     * @param row1column0 
     * @param row1column1 
     * @param row1column2 
     * @param row1column3 
     * @param row2column0 
     * @param row2column1 
     * @param row2column2 
     * @param row2column3 
     * @param row3column0 
     * @param row3column1 
     * @param row3column2 
     * @param row3column3 
     */
    constructor(
        row0column0: float = 1.0, row0column1: float = 0.0, row0column2: float = 0.0, row0column3: float = 0.0,
        row1column0: float = 0.0, row1column1: float = 1.0, row1column2: float = 0.0, row1column3: float = 0.0,
        row2column0: float = 0.0, row2column1: float = 0.0, row2column2: float = 1.0, row2column3: float = 0.0,
        row3column0: float = 0.0, row3column1: float = 0.0, row3column2: float = 0.0, row3column3: float = 1.0
    ) {
        super();
        this.elements = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        this.set(
            row0column0, row0column1, row0column2, row0column3,
            row1column0, row1column1, row1column2, row1column3,
            row2column0, row2column1, row2column2, row2column3,
            row3column0, row3column1, row3column2, row3column3
        );
    }

    /**
     * set the current matrix to the given elements,in row-major order
     * @param row0column0 
     * @param row0column1 
     * @param row0column2 
     * @param row0column3 
     * @param row1column0 
     * @param row1column1 
     * @param row1column2 
     * @param row1column3 
     * @param row2column0 
     * @param row2column1 
     * @param row2column2 
     * @param row2column3 
     * @param row3column0 
     * @param row3column1 
     * @param row3column2 
     * @param row3column3 
     * @returns the current updated matrix
     */
    set(
        row0column0: float = 1.0, row0column1: float = 0.0, row0column2: float = 0.0, row0column3: float = 0.0,
        row1column0: float = 0.0, row1column1: float = 1.0, row1column2: float = 0.0, row1column3: float = 0.0,
        row2column0: float = 0.0, row2column1: float = 0.0, row2column2: float = 1.0, row2column3: float = 0.0,
        row3column0: float = 0.0, row3column1: float = 0.0, row3column2: float = 0.0, row3column3: float = 1.0
    ): this {
        const elements = this.elements;
        elements[0] = row0column0; elements[4] = row0column1; elements[8] = row0column2; elements[12] = row0column3;
        elements[1] = row1column0; elements[5] = row1column1; elements[9] = row1column2; elements[13] = row1column3;
        elements[2] = row2column0; elements[6] = row2column1; elements[10] = row2column2; elements[14] = row2column3;
        elements[3] = row3column0; elements[7] = row3column1; elements[11] = row3column2; elements[15] = row3column3;
        return this;
    }

    /**
    * reset the current matrix to identity matrix
    * @returns 
    */
    identity(): this {
        this.set(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        );
        return this;
    }

    /**
    * check if the current matrix is identity
    * @returns true if the current matrix is identity
    */
    isIdentity(): boolean {
        return Matrix4.IDENTITY.equals(this);
    }

    /**
     * returns the determinant of the current matrix
     * @returns the determinant of the current matrix
     */
    determinant(): number {

        const elements = this.elements;

        const e11 = elements[0], e12 = elements[4], e13 = elements[8], e14 = elements[12];
        const e21 = elements[1], e22 = elements[5], e23 = elements[9], e24 = elements[13];
        const e31 = elements[2], e32 = elements[6], e33 = elements[10], e34 = elements[14];
        const e41 = elements[3], e42 = elements[7], e43 = elements[11], e44 = elements[15];

        return (
            e41 * (
                + e14 * e23 * e32
                - e13 * e24 * e32
                - e14 * e22 * e33
                + e12 * e24 * e33
                + e13 * e22 * e34
                - e12 * e23 * e34
            ) +
            e42 * (
                + e11 * e23 * e34
                - e11 * e24 * e33
                + e14 * e21 * e33
                - e13 * e21 * e34
                + e13 * e24 * e31
                - e14 * e23 * e31
            ) +
            e43 * (
                + e11 * e24 * e32
                - e11 * e22 * e34
                - e14 * e21 * e32
                + e12 * e21 * e34
                + e14 * e22 * e31
                - e12 * e24 * e31
            ) +
            e44 * (
                - e13 * e22 * e31
                - e11 * e23 * e32
                + e11 * e22 * e33
                + e13 * e21 * e32
                - e12 * e21 * e33
                + e12 * e23 * e31
            )
        );
    }

    /**
     * inverts the current matrix
     * @returns the current updated matrix
     */
    invert(): this {

        const elements = this.elements,

            n11 = elements[0], n21 = elements[1], n31 = elements[2], n41 = elements[3],
            n12 = elements[4], n22 = elements[5], n32 = elements[6], n42 = elements[7],
            n13 = elements[8], n23 = elements[9], n33 = elements[10], n43 = elements[11],
            n14 = elements[12], n24 = elements[13], n34 = elements[14], n44 = elements[15],

            t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
            t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
            t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
            t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        const detInv = 1 / det;

        elements[0] = t11 * detInv;
        elements[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        elements[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        elements[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

        elements[4] = t12 * detInv;
        elements[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        elements[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        elements[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

        elements[8] = t13 * detInv;
        elements[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        elements[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        elements[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

        elements[12] = t14 * detInv;
        elements[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        elements[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        elements[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

        return this;

    }

    /**
     * transposes the current matrix
     * @returns the current updated matrix
     */
    transpose(): this {
        const elements = this.elements;
        let temp = 0;
        temp = elements[1]; elements[1] = elements[4]; elements[4] = temp;
        temp = elements[2]; elements[2] = elements[8]; elements[8] = temp;
        temp = elements[3]; elements[3] = elements[12]; elements[12] = temp;
        temp = elements[6]; elements[6] = elements[9]; elements[9] = temp;
        temp = elements[7]; elements[7] = elements[13]; elements[13] = temp;
        temp = elements[11]; elements[11] = elements[14]; elements[14] = temp;
        return this;
    }

    /**
     * post-multiplies the current matrix by the given matrix
     * @param m the other matrix
     * @returns the current updated matrix
     */
    multiply(m: Matrix4): this {
        Matrix4.Multiply(this, m, this);
        return this;
    }

    /**
     * pre-multiplies the current matrix by the given matrix
     * @param m the other matrix
     * @returns the current updated matrix
     */
    preMultiply(m: Matrix4): this {
        Matrix4.Multiply(m, this, this);
        return this;
    }

    /**
     * returns a string that represent the current matrix
     * @returns the string representing the current matrix
     */
    toString(): string {
        let res = "[";
        for (let i = 0; i < 15; ++i) {
            res += this.elements[i];
            res += ","
        }
        res += this.elements[15];
        res += "]";
        return res;
    }

    /**
     * determines whether the current matrix is equal to the given matrix
     * @param rhs the other matrix
     * @returns true if the current matrix is equal to the given matrix
     */
    equals(rhs: this): boolean {
        for (let i = 0; i < 16; ++i) {
            if (this.elements[i] !== rhs.elements[i])
                return false;
        }
        return true;
    }

    /**
     * create a new Matrix4 object copied from the current matrix
     * @returns a new Matrix4 object
     */
    clone(): Matrix4 {
        return new Matrix4(
            this.elements[0], this.elements[4], this.elements[8], this.elements[12],
            this.elements[1], this.elements[5], this.elements[9], this.elements[13],
            this.elements[2], this.elements[6], this.elements[10], this.elements[14],
            this.elements[3], this.elements[7], this.elements[11], this.elements[15]
        );
    }

    /**
     * set the current matrix as a translate transform
     * @param translate 
     * @returns the current updated matrix
     */
    fromTranslation(translate: Vector3): Matrix4 {
        this.set(
            1, 0, 0, translate.x,
            0, 1, 0, translate.y,
            0, 0, 1, translate.z,
            0, 0, 0, 1
        );
        return this;
    }

    /**
     * set the current matrix as a scale transform
     * @param scale 
     * @returns the current updated matrix
     */
    fromScale(scale: Vector3): Matrix4 {
        this.set(
            scale.x, 0, 0, 0,
            0, scale.y, 0, 0,
            0, 0, scale.z, 0,
            0, 0, 0, 1
        );
        return this;
    }

    /**
     * set the current matrix as rotation transform around axis angle radians
     * @param axis rotation axis,must be normalized
     * @param angle rotation angle in radians
     * @returns 
     */
    fromRotationAxis(axis: Vector3, angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;
        const x = axis.x, y = axis.y, z = axis.z;
        const tx = t * x, ty = t * y;

        this.set(

            tx * x + c, tx * y - s * z, tx * z + s * y, 0,
            tx * y + s * z, ty * y + c, ty * z - s * x, 0,
            tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
            0, 0, 0, 1

        );

        return this;
    }

    /**
     * write the elements of the current matrix to an array in column-major format
     * @param array array to store the result
     * @param offset offset in the array of which to put the result
     * @returns result array
     */
    toArray(array: number[] | undefined = undefined, offset: number = 0): number[] {
        const te = this.elements;
        if (array === undefined)
            array = [];

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];

        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];

        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];

        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];

        return array;
    }

    /**
     * computes the product of two matrices
     * @param a the first matrix
     * @param b the second matrix
     * @param result The object onto which to store the result
     * @returns The modified result parameter
     */
    static Multiply(a: Matrix4, b: Matrix4, result: Matrix4): Matrix4 {
        const ae = a.elements;
        const be = b.elements;
        const a00 = ae[0], a01 = ae[4], a02 = ae[8], a03 = ae[12];
        const a10 = ae[1], a11 = ae[5], a12 = ae[9], a13 = ae[13];
        const a20 = ae[2], a21 = ae[6], a22 = ae[10], a23 = ae[14];
        const a30 = ae[3], a31 = ae[7], a32 = ae[11], a33 = ae[15];

        const b00 = be[0], b01 = be[4], b02 = be[8], b03 = be[12];
        const b10 = be[1], b11 = be[5], b12 = be[9], b13 = be[13];
        const b20 = be[2], b21 = be[6], b22 = be[10], b23 = be[14];
        const b30 = be[3], b31 = be[7], b32 = be[11], b33 = be[15];

        if (result == null)
            result = new Matrix4();

        const r00 = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        const r01 = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        const r02 = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        const r03 = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

        const r10 = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        const r11 = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        const r12 = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        const r13 = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;

        const r20 = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        const r21 = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        const r22 = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        const r23 = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;

        const r30 = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        const r31 = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        const r32 = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        const r33 = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

        result.set(r00, r01, r02, r03, r10, r11, r12, r13, r20, r21, r22, r23, r30, r31, r32, r33);

        return result;
    }

    static MakePerspective(fov: number, aspect: number, near: number, far: number, result: Matrix4 | undefined = undefined): Matrix4 {
        if (result === undefined) {
            result = new Matrix4();
        }

        const bottom = Math.tan(fov * 0.5);

        const column1Row1 = 1.0 / bottom;
        const column0Row0 = column1Row1 / aspect;
        const column2Row2 = (far + near) / (near - far);
        const column3Row2 = (2.0 * far * near) / (near - far);

        const elements = result.elements;
        elements[0] = column0Row0;
        elements[1] = 0.0;
        elements[2] = 0.0;
        elements[3] = 0.0;
        elements[4] = 0.0;
        elements[5] = column1Row1;
        elements[6] = 0.0;
        elements[7] = 0.0;
        elements[8] = 0.0;
        elements[9] = 0.0;
        elements[10] = column2Row2;
        elements[11] = -1.0;
        elements[12] = 0.0;
        elements[13] = 0.0;
        elements[14] = column3Row2;
        elements[15] = 0.0;
        return result;
    }

    static MakeOrthographic(left: float, right: float, bottom: float, top: float, near: float, far: float, result: Matrix4 | undefined = undefined): Matrix4 {
        if (result === undefined) {
            result = new Matrix4();
        }

        let a = 1.0 / (right - left);
        let b = 1.0 / (top - bottom);
        let c = 1.0 / (far - near);

        const tx = -(right + left) * a;
        const ty = -(top + bottom) * b;
        const tz = -(far + near) * c;
        a *= 2.0;
        b *= 2.0;
        c *= -2.0;

        const elements = result.elements;
        elements[0] = a;
        elements[1] = 0.0;
        elements[2] = 0.0;
        elements[3] = 0.0;
        elements[4] = 0.0;
        elements[5] = b;
        elements[6] = 0.0;
        elements[7] = 0.0;
        elements[8] = 0.0;
        elements[9] = 0.0;
        elements[10] = c;
        elements[11] = 0.0;
        elements[12] = tx;
        elements[13] = ty;
        elements[14] = tz;
        elements[15] = 1.0;

        return result;

    }

    static MakeLookat(eye: Vector3, center: Vector3, up: Vector3, res: Matrix4 | undefined = undefined): Matrix4 {
        if (res === undefined) {
            res = new Matrix4();
        }

        let look: Vector3 = center.clone().subtract(eye).normalize();
        let side: Vector3 = Vector3.Cross(look, up).normalize();
        let upTemp = Vector3.Cross(side, look).normalize();

        res.set(
            side.x, side.y, side.z, 0,
            upTemp.x, upTemp.y, upTemp.z, 0,
            -look.x, -look.y, -look.z, 0,
            0, 0, 0, 1
        );

        let translation = new Matrix4();
        translation.fromTranslation(new Vector3(-eye.x, -eye.y, -eye.z));
        res = res.multiply(translation)
        return res;
    }
    static readonly IDENTITY: Matrix4 = new Matrix4();

    /**
     * elements stored in column-major order array
     */
    public elements: FloatArray;
}

export default Matrix4;