import { Vector2 } from "../../src/index";

describe("teset Vector2", () => {
    test("construct with default values", () => {
        const vec2 = new Vector2();
        expect(vec2.x).toBe(0.0);
        expect(vec2.y).toBe(0.0)
    })

    test("construct with x value", () => {
        const vec2 = new Vector2(1.0);
        expect(vec2.x).toBe(1.0);
        expect(vec2.y).toBe(0.0)
    })

    test("construct with all values", () => {
        const vec2 = new Vector2(1.0, 1.0);
        expect(vec2.x).toBe(1.0);
        expect(vec2.y).toBe(1.0)
    })

    test("add", () => {
        const vec2 = new Vector2(1.0, 1.0);
        expect(new Vector2(1,2).add(vec2)).toEqual(new Vector2(2.0,3.0));
    })

    test("subtract", () => {
        const vec2 = new Vector2(1.0, 1.0);
        expect(new Vector2(1,2).subtract(vec2)).toEqual(new Vector2(0.0,1.0));
    })

    test("multiply", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(new Vector2(1,2).multiply(vec2)).toEqual(new Vector2(2.0,4.0));
    })

    test("divide", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(new Vector2(1,2).divide(vec2)).toEqual(new Vector2(0.5,1.0));
        expect(()=>new Vector2(1,2).divide(new Vector2(0.0,0.0))).toThrowError();
    })

    test("negate", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.negate()).toEqual(new Vector2(-2.0,-2.0));
    })

    test("scale", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.scale(2)).toEqual(new Vector2(4.0,4.0));
    })

    test("normalize", () => {
        const vec2 = new Vector2(2.0, 0.0);
        expect(vec2.normalize()).toEqual(new Vector2(1.0,0.0));
    })

    test("dot", () => {
        const vec2 = new Vector2(2.0, 0.0);
        expect(vec2.dot(new Vector2(1.0,0.0))).toEqual(2.0);
    })

    test("length", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.length()).toEqual(Math.sqrt(8.0));
    })

    test("lengthSquared", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.squaredLength()).toEqual(8.0);
    })

    test("distanceTo", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.distanceTo(new Vector2(2.0,0.0))).toEqual(2.0);
    })

    test("squaredDistanceTo", () => {
        const vec2 = new Vector2(2.0, 2.0);
        expect(vec2.squaredDistanceTo(new Vector2(2.0,0.0))).toEqual(4.0);
    })

    test("toString", () => {
        const vec2 = new Vector2(1, 1);
        expect(vec2.toString()).toEqual("{x:1,y:1}");
    })

    test("equals", () => {
        const lhs = new Vector2(1.0, 1.0);
        expect(lhs.equals(new Vector2(1.0, 1.0))).toBe(true);
        expect(lhs.equals(new Vector2(1.0, 2.0))).toBe(false);
    })

    test("clone", () => {
        const vec2 = new Vector2(1.0, 1.0);
        expect(vec2.clone().equals(vec2)).toBe(true);
    })
})