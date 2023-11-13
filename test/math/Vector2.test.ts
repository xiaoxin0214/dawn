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