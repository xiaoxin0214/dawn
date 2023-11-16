import ICloneable from "../base/ICloneable";
import BaseObject from "../base/BaseObject";
import { FloatArray, Nullable, float } from "../base/Type";

/**
 * a 3*3 matrix,stored in column-major order array
 */
class Matrix3 extends BaseObject implements ICloneable {
    /**
     * create a new Matrix3 object from the given elements, in row-major order for code readability
     * @param row0column0 
     * @param row0column1 
     * @param row0column2 
     * @param row1column0 
     * @param row1column1 
     * @param row1column2 
     * @param row2column0 
     * @param row2column1 
     * @param row2column2 
     */
    constructor(row0column0: float = 1.0, row0column1: float = 0.0, row0column2: float = 0.0,
        row1column0: float = 0.0, row1column1: float = 1.0, row1column2: float = 0.0,
        row2column0: float = 0.0, row2column1: float = 0.0, row2column2: float = 1.0
    ) {
        super();
        this.elements = [
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        ];
        this.set(row0column0, row0column1, row0column2,
            row1column0, row1column1, row1column2,
            row2column0, row2column1, row2column2);
    }

    /**
     * set the current matrix elements to the given elements,in row-major order
     * @param row0column0 
     * @param row0column1 
     * @param row0column2 
     * @param row1column0 
     * @param row1column1 
     * @param row1column2 
     * @param row2column0 
     * @param row2column1 
     * @param row2column2 
     * @returns the current updated matrix
     */
    set(row0column0: float = 1.0, row0column1: float = 0.0, row0column2: float = 0.0,
        row1column0: float = 0.0, row1column1: float = 1.0, row1column2: float = 0.0,
        row2column0: float = 0.0, row2column1: float = 0.0, row2column2: float = 1.0): this {
        this.elements = [
            row0column0, row1column0, row2column0,
            row0column1, row1column1, row2column1,
            row0column2, row1column2, row2column2,
        ];
        return this;
    }

    /**
     * reset the current matrix to identity matrix
     * @returns 
     */
    identity(): this {
        this.set(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        );
        return this;
    }

    /**
     * returns the determinant of the current matrix
     * @returns the determinant of the current matrix
     */
    determinant(): number {
        const elements = this.elements;

        const e00 = elements[0];
        const e10 = elements[1];
        const e20 = elements[2];
        const e01 = elements[3];
        const e11 = elements[4];
        const e21 = elements[5];
        const e02 = elements[6];
        const e12 = elements[7];
        const e22 = elements[8];

        return e00 * e11 * e22 - e00 * e21 * e12 - e10 * e01 * e22 + e10 * e21 * e02 + e20 * e01 * e12 - e20 * e11 * e02;
    }

    /**
     * inverts the current matrix
     * @returns the current updated matrix
     */
    invert(): this {
        const elements = this.elements;
        const e00 = elements[0];
        const e10 = elements[1];
        const e20 = elements[2];
        const e01 = elements[3];
        const e11 = elements[4];
        const e21 = elements[5];
        const e02 = elements[6];
        const e12 = elements[7];
        const e22 = elements[8];

        const t11 = e22 * e11 - e21 * e12;
        const t12 = e21 * e02 - e22 * e01;
        const t13 = e12 * e01 - e11 * e02;

        const det = e00 * t11 + e10 * t12 + e20 * t13;

        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);

        const detInv = 1 / det;

        elements[0] = t11 * detInv;
        elements[1] = (e20 * e12 - e22 * e10) * detInv;
        elements[2] = (e21 * e10 - e20 * e11) * detInv;

        elements[3] = t12 * detInv;
        elements[4] = (e22 * e00 - e20 * e02) * detInv;
        elements[5] = (e20 * e01 - e21 * e00) * detInv;

        elements[6] = t13 * detInv;
        elements[7] = (e10 * e02 - e12 * e00) * detInv;
        elements[8] = (e11 * e00 - e10 * e01) * detInv;

        return this;
    }

    /**
     * check if the current matrix is identity
     * @returns true if the current matrix is identity
     */
    isIdentity(): boolean {
        return Matrix3.IDENTITY.equals(this);
    }

    /**
     * transposes the current matrix
     * @returns the current updated matrix
     */
    transpose(): this {
        let temp = 0;
        const elements = this.elements;
        temp = elements[1]; elements[1] = elements[3]; elements[3] = temp;
        temp = elements[2]; elements[2] = elements[6]; elements[6] = temp;
        temp = elements[5]; elements[5] = elements[7]; elements[7] = temp;
        return this;
    }

    /**
     * post-multiplies the current matrix by the given matrix
     * @param m the other matrix
     * @returns the current updated matrix
     */
    multiply(m: Matrix3): this {
        Matrix3.Multiply(this, m, this);
        return this;
    }

    /**
     * pre-multiplies the current matrix by the given matrix
     * @param m the other matrix
     * @returns the current updated matrix
     */
    preMultiply(m: Matrix3): this {
        Matrix3.Multiply(m, this, this);
        return this;
    }

    /**
     * 
     * @returns a string representing the current Matrix3 object
     */
    toString(): string {
        let res = "[";
        for (let i = 0; i < 8; ++i) {
            res += this.elements[i];
            res += ","
        }
        res += this.elements[8];
        res += "]";
        return res;
    }

    /**
     * determines whether the current matrix is equal to the given matrix
     * @param rhs the right hand side object
     * @returns true if the current object is equal to the given object
     */
    equals(rhs: this): boolean {
        for (let i = 0; i < 9; ++i) {
            if (this.elements[i] !== rhs.elements[i])
                return false;
        }
        return true;
    }

    /**
     * create a new Matrix3 object copied from the current Matrix3 object
     * @returns 
     */
    clone(): this {
        return this.constructor(this.elements[0], this.elements[3], this.elements[6],
            this.elements[1], this.elements[4], this.elements[7],
            this.elements[2], this.elements[5], this.elements[8]);
    }

    /**
     * computes the product of two matrices
     * @param a the first matrix
     * @param b the second matrix
     * @param result The object onto which to store the result
     * @returns The modified result parameter
     */
    static Multiply(a: Matrix3, b: Matrix3, result: Nullable<Matrix3>): Matrix3 {
        const ae = a.elements;
        const be = b.elements;
        const a00 = ae[0], a01 = ae[3], a02 = ae[6];
        const a10 = ae[1], a11 = ae[4], a12 = ae[7];
        const a20 = ae[2], a21 = ae[5], a22 = ae[8];

        const b00 = be[0], b01 = be[3], b02 = be[6];
        const b10 = be[1], b11 = be[4], b12 = be[7];
        const b20 = be[2], b21 = be[5], b22 = be[8];

        if (result == null)
            result = new Matrix3();

        const r00 = a00 * b00 + a01 * b10 + a02 * b20;
        const r01 = a00 * b01 + a01 * b11 + a02 * b21;
        const r02 = a00 * b02 + a01 * b12 + a02 * b22;

        const r10 = a10 * b00 + a11 * b10 + a12 * b20;
        const r11 = a10 * b01 + a11 * b11 + a12 * b21;
        const r12 = a10 * b02 + a11 * b12 + a12 * b22;

        const r20 = a20 * b00 + a21 * b10 + a22 * b20;
        const r21 = a20 * b01 + a21 * b11 + a22 * b21;
        const r22 = a20 * b02 + a21 * b12 + a22 * b22;

        result.set(r00, r01, r02, r10, r11, r12, r20, r21, r22);

        return result;
    }

    static readonly IDENTITY: Matrix3 = new Matrix3();
    /**
     * elements stored in column-major order array
     */
    public elements: FloatArray;
}

export default Matrix3