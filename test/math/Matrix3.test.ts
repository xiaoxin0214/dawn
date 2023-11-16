import { Matrix3 } from "../../src/index";
describe("test Matrix3", () => {
    test("constructor with default values", () => {
        const matrix = new Matrix3();
        expect(matrix.elements).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    })

    test("constructor with all values", () => {
        const matrix = new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
        expect(matrix.elements).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    })

    test("set", () => {
        const matrix = new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
        expect(matrix.set(2.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 2.0).elements).toEqual([2, 0, 0, 0, 2, 0, 0, 0, 2]);
    })

    test("isIdentity", () => {
        const matrix = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(matrix.isIdentity()).toBe(false);
        expect(matrix.identity().isIdentity()).toBe(true);
    })

    test("identity", () => {
        const matrix = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(matrix.isIdentity()).toBe(false);
        expect(matrix.identity().isIdentity()).toBe(true);
    })

    test("determinant", () => {
        const matrix = new Matrix3(1.0, 5.0, 2.0, 1.0, 1.0, 7.0, 0.0, -3.0, 4.0);
        expect(matrix.determinant()).toEqual(-1.0);
    })

    test("transpose", () => {
        const matrix = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const transposedMatrix = new Matrix3(1, 4, 7, 2, 5, 8, 3, 6, 9);
        expect(matrix.transpose()).toEqual(transposedMatrix);
    })

    test("invert", () => {
        const matrix = new Matrix3(1.0, 5.0, 2.0, 1.0, 1.0, 7.0, 0.0, -3.0, 4.0);
        const result = new Matrix3(-25.0, 26.0, -33.0, 4.0, -4.0, 5.0, 3.0, -3.0, 4.0);
        expect(matrix.invert()).toEqual(result);
    })

    test("multiply", () => {
        const matrix1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const matrix2 = new Matrix3(10, 11, 12, 13, 14, 15, 16, 17, 18);
        expect(matrix1.multiply(matrix2)).toEqual(new Matrix3(84, 90, 96, 201, 216, 231, 318, 342, 366));
    })

    test("preMultiply", () => {
        const matrix1 = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const matrix2 = new Matrix3(10, 11, 12, 13, 14, 15, 16, 17, 18);
        expect(matrix1.preMultiply(matrix2)).toEqual(new Matrix3(138, 171, 204, 174, 216, 258, 210, 261, 312));
    })

    test("toString", () => {
        const matrix = new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
        expect(matrix.toString()).toEqual("[1,0,0,0,1,0,0,0,1]");
    })

    test("equals", () => {
        const matrix = new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
        expect(matrix.equals(new Matrix3())).toBe(true);
        expect(matrix.equals(new Matrix3(2.0))).toBe(false);
    })

    test("clone", () => {
        const matrix = new Matrix3();
        expect(matrix.clone()).toEqual(new Matrix3());
    })
})