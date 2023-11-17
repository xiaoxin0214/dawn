import { Vector3 } from "../../src/index";

describe("test Vector3", () => {
    test("construct with default values", () => {
        const vec3 = new Vector3();
        expect(vec3.x).toBe(0.0);
        expect(vec3.y).toBe(0.0);
        expect(vec3.z).toBe(0.0)
    })

    test("construct with x value", () => {
        const vec3 = new Vector3(1.0);
        expect(vec3.x).toBe(1.0);
        expect(vec3.y).toBe(0.0);
        expect(vec3.z).toBe(0.0)
    })

    test("construct with all values", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.x).toBe(1.0);
        expect(vec3.y).toBe(2.0);
        expect(vec3.z).toBe(3.0)
    })

    test("add", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.add(new Vector3(1.0, 1.0, 1.0))).toEqual(new Vector3(2.0, 3.0, 4.0));
    })

    test("subtract", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.subtract(new Vector3(1.0, 1.0, 1.0))).toEqual(new Vector3(0.0, 1.0, 2.0));
    })

    test("multiply", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.multiply(new Vector3(2.0, 1.0, 0.0))).toEqual(new Vector3(2.0, 2.0, 0.0));
    })

    test("divide", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.divide(new Vector3(2.0, 1.0, 2.0))).toEqual(new Vector3(0.5, 2.0, 1.5));
        expect(() => vec3.divide(new Vector3(0.0, 1.0, 2.0))).toThrowError();
    })

    test("negate", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.negate()).toEqual(new Vector3(-1.0, -2.0, -3.0));
    })

    test("scale", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.scale(2)).toEqual(new Vector3(2.0, 4.0, 6.0));
    })

    test("length", () => {
        const vec3 = new Vector3(1.0, 1.0, 1.0);
        expect(vec3.length()).toEqual(Math.sqrt(3.0));
    })

    test("squaredLength", () => {
        const vec3 = new Vector3(1.0, 1.0, 1.0);
        expect(vec3.squaredLength()).toEqual(3.0);
    })

    test("normalize", () => {
        const vec3 = new Vector3(2.0, 0.0, 0.0);
        expect(vec3.normalize()).toEqual(new Vector3(1.0, 0.0, 0.0));
    })

    test("distanceTo", () => {
        const vec3 = new Vector3(2.0, 0.0, 0.0);
        expect(vec3.distanceTo(new Vector3(1.0, 0.0, 0.0))).toEqual(1.0);
    })

    test("squaredDistanceTo", () => {
        const vec3 = new Vector3(2.0, 0.0, 0.0);
        expect(vec3.squaredDistanceTo(new Vector3(4.0, 0.0, 0.0))).toEqual(4.0);
    })

    test("dot", () => {
        const vec3 = new Vector3(2.0, 0.0, 0.0);
        expect(vec3.dot(new Vector3(4.0, 0.0, 0.0))).toEqual(8.0);
    })

    test("Cross", () => {
        const value1 = new Vector3(1.0, 0.0, 0.0);
        const value2 = new Vector3(0.0, 1.0, 0.0)
        expect(Vector3.Cross(value1, value2)).toEqual(new Vector3(0.0, 0.0, 1.0));
    })

    test("toString", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.toString()).toEqual("{x:1,y:2,z:3}");
    })

    test("clone", () => {
        const vec3 = new Vector3(1.0, 2.0, 3.0);
        expect(vec3.clone()).toEqual(vec3);
    })

    test("equals", () => {
        const lhs = new Vector3(1.0, 1.0, 1.0);
        expect(lhs.equals(new Vector3(1.0, 1.0, 1.0))).toBe(true);
        expect(lhs.equals(new Vector3(1.0, 2.0, 1.0))).toBe(false);
    })

})