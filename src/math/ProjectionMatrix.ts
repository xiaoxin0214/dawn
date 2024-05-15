import Matrix4 from "./Matrix4";
class ProjectionMatrix {
    constructor(matrix: Matrix4 = new Matrix4()) {
        this.matrix = matrix;
        this.matrixInv=matrix.clone().invert();
    }

    public matrix: Matrix4;
    public matrixInv:Matrix4;
}

export default ProjectionMatrix;