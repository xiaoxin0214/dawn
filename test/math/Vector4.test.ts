import { Vector4 } from "../../src/index";
describe("test Vector4", () => {
    test("constructor with default values", () => {
        const vec4 = new Vector4();
        expect(vec4.x).toEqual(0);
        expect(vec4.y).toEqual(0);
        expect(vec4.z).toEqual(0);
        expect(vec4.w).toEqual(0);
    })

    test("constructor with all values", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.x).toEqual(1);
        expect(vec4.y).toEqual(2);
        expect(vec4.z).toEqual(3);
        expect(vec4.w).toEqual(4);
    })

    test("add", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.add(new Vector4(1.0, 1.0, 1.0, 1.0))).toEqual(new Vector4(2.0, 3.0, 4.0, 5.0));
    })

    test("subtract", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.subtract(new Vector4(1.0, 1.0, 1.0, 1.0))).toEqual(new Vector4(0.0, 1.0, 2.0, 3.0));
    })

    test("multiply", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.multiply(new Vector4(2, 2, 2, 2))).toEqual(new Vector4(2.0, 4.0, 6.0, 8.0));
    })

    test("divide", () => {
        const vec4 = new Vector4(2.0, 4.0, 6.0, 8.0);
        expect(vec4.divide(new Vector4(2, 2, 2, 2))).toEqual(new Vector4(1.0, 2.0, 3.0, 4.0));
    })

    test("scale", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.scale(2)).toEqual(new Vector4(2.0, 4.0, 6.0, 8.0));
    })

    test("negate", () => {
        const vec4 = new Vector4(2.0, 4.0, 6.0, 8.0);
        expect(vec4.negate()).toEqual(new Vector4(-2.0, -4.0, -6.0, -8.0));
    })

    test("normalize", () => {
        const vec4 = new Vector4(2.0, 0.0, 0.0, 0.0);
        expect(vec4.normalize()).toEqual(new Vector4(1.0, 0.0, 0.0));
    })

    test("length", () => {
        const vec4 = new Vector4(1.0, 1.0, 1.0, 1.0);
        expect(vec4.length()).toEqual(Math.sqrt(4.0));
    })

    test("squaredLength", () => {
        const vec4 = new Vector4(1.0, 1.0, 1.0, 1.0);
        expect(vec4.squaredLength()).toEqual(4);
    })

    test("distanceTo", () => {
        const vec4 = new Vector4(2.0, 3.0, 4.0, 5.0);
        expect(vec4.distanceTo(new Vector4(1.0, 3.0, 4.0, 5.0))).toEqual(1.0);
    })

    test("squaredDistanceTo", () => {
        const vec4 = new Vector4(2.0, 0.0, 0.0, 0.0);
        expect(vec4.squaredDistanceTo(new Vector4(4.0, 0.0, 0.0, 0.0))).toEqual(4.0);
    })

    test("equals", () => {
        const left = new Vector4(1.0, 2.0, 3.0, 4.0);
        const right = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(left.equals(right)).toEqual(true);
        expect(left.equals(new Vector4())).toEqual(false);
    })

    test("clone", () => {
        const vec4 = new Vector4(1.0, 2.0, 3.0, 4.0);
        const expected = new Vector4(1.0, 2.0, 3.0, 4.0);
        expect(vec4.clone()).toEqual(expected);
    })
})