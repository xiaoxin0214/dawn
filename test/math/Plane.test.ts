import { Plane, Vector3 } from "../../src/index";
describe("test Plane", () => {
    test("construct", () => {
        const plane = new Plane(1.0, 0.0, 0.0, 1.0);
        expect(plane.normal).toEqual(new Vector3(1.0, 0.0, 0.0));
        expect(plane.distance).toBe(1.0)
    })

    test("distanceToPoint", () => {
        const plane = new Plane(-1.0, 0.0, 0.0, 1.0);
        expect(plane.distanceToPoint(new Vector3(2.0, 1.0, 0.0))).toEqual(-1.0);
    })

    test("projectPoint", () => {
        const plane = new Plane(1.0, 0.0, 0.0, -1.0);
        expect(plane.projectPoint(new Vector3(2.0, 1.0, 0.0))).toEqual(new Vector3(1.0, 1.0, 0.0));
        expect(plane.projectPoint(new Vector3(-2.0, 1.0, 0.0))).toEqual(new Vector3(1.0, 1.0, 0.0));
    })

    test("toString", () => {
        const plane = new Plane(1.0, 0.0, 0.0, 1.0);
        expect(plane.toString()).toEqual(`{normal:${new Vector3(1.0, 0.0, 0.0).toString()},distance:1}`);
    })

    test("equals", () => {
        const plane = new Plane(1.0, 0.0, 0.0, 1.0);
        expect(plane.equals(new Plane(1.0, 0.0, 0.0, 1.0))).toBe(true);
        expect(plane.equals(new Plane(1.0, 1.0, 0.0, 1.0))).toBe(false);
    })

    test("clone", () => {
        const plane = new Plane(1.0, 0.0, 0.0, 1.0);
        expect(plane.clone()).toEqual(new Plane(1.0, 0.0, 0.0, 1.0));
    })

    test("FromNormalAndPoint", () => {
        expect(Plane.FromNormalAndPoint(new Vector3(2.0, 0.0, 0.0), new Vector3(3.0, 0.0, 0.0))).toEqual(new Plane(1.0, 0.0, 0.0, -3.0));
    })

    test("FromPoints", () => {
        expect(Plane.FromPoints(new Vector3(3.0, 0.0, 0.0), new Vector3(3.0, 1.0, 0.0), new Vector3(3.0, 1.0, 1.0))).toEqual(new Plane(1.0, 0.0, 0.0, -3.0));
    })
})