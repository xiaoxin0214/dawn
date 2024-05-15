import { float } from "../base/Type";
import DawnMath from "./DawnMath";
import Matrix4 from "./Matrix4";
import ProjectionMatrix from "./ProjectionMatrix";

class Perspective extends ProjectionMatrix {
    /**
     * 
     * @param fov vertical field of view in degrees
     * @param aspect aspect ratio
     * @param near near distance
     * @param far far distance
     */
    constructor(fov: float, aspect: float, near: float, far: float) {
        super(Matrix4.MakePerspective(DawnMath.ToRadians(fov), aspect, near, far));
        this.m_fov = fov;
        this.m_aspect = aspect;
        this.m_near = near;
        this.m_far = far;
    }

    public m_fov: float;
    public m_aspect: float;
    public m_near: float;
    public m_far: float;
}

export default Perspective;
