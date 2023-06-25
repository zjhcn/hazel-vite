import { mat4 } from "gl-matrix";
import { RenderCommand } from "./RenderCommand";
import type { VertexArray } from "./VertexArray";
import type { OrthographicCamera } from "./OrthographicCamera";
import type { Shader } from "./Shader";

interface SceneData {
    viewProjectionMatrix: mat4;
}

// Private static data
let sceneData: SceneData = {
    viewProjectionMatrix: mat4.create(),
};

export class Renderer {
    static beginScene(camera: OrthographicCamera): void {
        sceneData.viewProjectionMatrix = camera.getViewProjectionMatrix();
    }

    static endScene(): void {}

    static submit(shader: Shader, vertexArray: VertexArray): void {
        shader.bind();
        shader.uploadUniformMat4(
            "u_ViewProjection",
            sceneData.viewProjectionMatrix,
        );
        vertexArray.bind();

        RenderCommand.drawIndexed(vertexArray);
    }

    static setViewport(x: number, y: number, width: number, height: number): void {
        RenderCommand.setViewport(x, y, width, height);
    }
}
