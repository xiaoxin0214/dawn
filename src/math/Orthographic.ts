import {float} from "../base/Type";
import Matrix4 from "./Matrix4";
import ProjectionMatrix from "./ProjectionMatrix";
class Orthographic extends ProjectionMatrix {
    constructor(left:float,right:float,bottom:float,top:float,near:float,far:float) {
        super(Matrix4.MakeOrthographic(left,right,bottom,top,near,far));
        this.m_left=left;
        this.m_right=right;
        this.m_bottom=bottom;
        this.m_top=top;
        this.m_near=near;
        this.m_far=far;
    }

    public m_left: float;
    public m_right: float;
    public m_bottom: float;
    public m_top: float;
    public m_near: float;
    public m_far: float;
}
export default Orthographic;
