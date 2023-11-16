import { Matrix4 } from "../../src/index";
describe("test Matrix4", () => {
    test("constructor with default values", () => {
        const matrix = new Matrix4();
        expect(matrix.elements).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });

    test("constructor with all values", () => {
        const matrix = new Matrix4(
            1.0, 2.0, 3.0, 4.0,
            5.0, 6.0, 7.0, 8.0,
            9.0, 10.0, 11.0, 12.0,
            13.0, 14.0, 15.0, 16.0
        );

        expect(matrix.elements).toEqual([1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
    });

    test("isIdentity", () => {
        const matrix = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        expect(matrix.isIdentity()).toBe(false);
        expect(matrix.identity().isIdentity()).toBe(true);
    })

    test("identity", () => {
        const matrix = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        expect(matrix.isIdentity()).toBe(false);
        expect(matrix.identity().isIdentity()).toBe(true);
    })

    test("transpose", () => {
        const matrix = new Matrix4(
            1.0, 2.0, 3.0, 4.0,
            5.0, 6.0, 7.0, 8.0,
            9.0, 10.0, 11.0, 12.0,
            13.0, 14.0, 15.0, 16.0
        );
        const expected = new Matrix4(
            1.0, 5.0, 9.0, 13.0,
            2.0, 6.0, 10.0, 14.0,
            3.0, 7.0, 11.0, 15.0,
            4.0, 8.0, 12.0, 16.0
        );

        expect(matrix.transpose()).toEqual(expected);
    })

    test("multiply", () => {
        const left = new Matrix4(
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16
        );
        const right = new Matrix4(
            17, 18, 19, 20,
            21, 22, 23, 24,
            25, 26, 27, 28,
            29, 30, 31, 32
        );
        const expected = new Matrix4(
            250, 260, 270, 280,
            618, 644, 670, 696,
            986, 1028, 1070, 1112,
            1354, 1412, 1470, 1528
        );

        expect(left.multiply(right)).toEqual(expected);
    })

    test("preMultiply", () => {
        const left = new Matrix4(
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16
        );
        const right = new Matrix4(
            17, 18, 19, 20,
            21, 22, 23, 24,
            25, 26, 27, 28,
            29, 30, 31, 32
        );
        const expected = new Matrix4(
            538, 612, 686, 760,
            650, 740, 830, 920,
            762, 868, 974, 1080,
            874, 996, 1118, 1240,
        );

        expect(left.preMultiply(right)).toEqual(expected);
    })

    test("equals", () => {
        const matrix1 = new Matrix4(
            1.0, 2.0, 3.0, 4.0,
            5.0, 6.0, 7.0, 8.0,
            9.0, 10.0, 11.0, 12.0,
            13.0, 14.0, 15.0, 16.0
        );

        const matrix2 = new Matrix4();

        expect(matrix1.equals(Matrix4.IDENTITY)).toBe(false);
        expect(matrix2.equals(Matrix4.IDENTITY)).toBe(true);
    });

    test("clone", () => {
        const matrix = new Matrix4(
            1.0, 2.0, 3.0, 4.0,
            5.0, 6.0, 7.0, 8.0,
            9.0, 10.0, 11.0, 12.0,
            13.0, 14.0, 15.0, 16.0
        );

        expect(matrix.clone()).toEqual(matrix);
    });

})