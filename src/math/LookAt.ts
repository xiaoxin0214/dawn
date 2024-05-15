import Vector3 from "./Vector3";
import Matrix4 from "./Matrix4";
import ViewMatrix from "./ViewMatrix";
class LookAt extends ViewMatrix {
    constructor(eye: Vector3, center: Vector3, up:Vector3) {
        let look:Vector3=center.clone().subtract(eye);
        let side:Vector3=Vector3.Cross(look,up);
        up=Vector3.Cross(side,look).normalize();
        super(Matrix4.MakeLookat(eye,center,up));
        this.m_eye = eye;
        this.m_center = center;
        this.m_up = up;
    }
    private m_eye: Vector3;
    private m_center: Vector3;
    private m_up: Vector3;
}

export default LookAt;