import { Matrix4 } from "../index";
import ProjectionMatrix from "../math/ProjectionMatrix";
import ViewMatrix from "../math/ViewMatrix";
class Camera
{
    constructor(projection:ProjectionMatrix,view:ViewMatrix)
    {
        this.m_projection=projection;
        this.m_view=view;
    }

    get projection():Matrix4{
        return this.m_projection.matrix;
    }

    get view():Matrix4{
        return this.m_view.matrix;
    }
    private m_projection:ProjectionMatrix;
    private m_view:ViewMatrix;
}

export default Camera;