import { Cartographic, DawnMath } from "../../src/index";

describe("test Cartographic", () => {
    test("constructor", () => {
        let cartographic = new Cartographic(1, 2);
        expect(cartographic.longitude).toEqual(1);
        expect(cartographic.latitude).toEqual(2);
        expect(cartographic.height).toEqual(0);
    })

    test("from degrees", () => {
        let cartographic=new Cartographic();
        cartographic.fromDegrees(120,40,0);
        expect(cartographic.longitude).toEqual(DawnMath.ToRadians(120));
        expect(cartographic.latitude).toEqual(DawnMath.ToRadians(40));
        expect(cartographic.height).toEqual(0);
    })
})