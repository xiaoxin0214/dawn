import { Ellipsoid, Vector3 } from "../../src/index";
describe("test Ellipsoid", () => {
    test("constructor with all values", () => {
        const ellipsoid = new Ellipsoid(1.0, 2.0, 3.0);
        expect(ellipsoid.radii).toEqual(new Vector3(1.0, 2.0, 3.0));
    })

    test("toString", () => {
        const ellipsoid = new Ellipsoid(1.0, 2.0, 3.0);
        expect(ellipsoid.toString()).toEqual("{x:1,y:2,z:3}");
    })

    test("equals", () => {
        const left = new Ellipsoid(1.0, 2.0, 3.0);
        const right = new Ellipsoid(1.0, 2.0, 3.0);
        expect(left.equals(right)).toBe(true);
        expect(left.equals(new Ellipsoid(1.0, 0.0, 0.0))).toBe(false);
    })

    test("clone", () => {
        const ellipsoid = new Ellipsoid(1.0, 2.0, 3.0);
        const expected = new Ellipsoid(1.0, 2.0, 3.0);
        expect(ellipsoid.clone()).toEqual(expected);
    })
})