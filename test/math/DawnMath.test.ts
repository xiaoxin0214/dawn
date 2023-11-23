import { DawnMath } from "../../src/index";
describe("test DawnMath", () => {
    test("ToDegrees", () => {
        expect(DawnMath.ToDgrees(Math.PI)).toEqual(180);
    })

    test("ToRadians", () => {
        expect(DawnMath.ToRadians(180)).toEqual(Math.PI);
    })
})