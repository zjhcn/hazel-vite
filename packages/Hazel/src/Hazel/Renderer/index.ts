export * from "./GraphicsContext"
export * from "./Shader"

import { Renderer, RendererAPI } from "./Renderer";
import { GraphicsContext } from "./GraphicsContext"
import { IndexBuffer, VertexBuffer } from "./Buffer";

//#region Renderer WebGL2
import { WebGL2GraphicsContext } from "@pw/Hazel/Platform/Renderer/WebGL2/WebGL2GraphicsContext";
import {
    WebGL2VertexBuffer,
    WebGL2IndexBuffer,
} from "@pw/Hazel/Platform/Renderer/WebGL2/WebGL2Buffer";
import { WebGL2Shader } from "@pw/Hazel/Platform/Renderer/WebGL2/WebGL2Shader";
import { Shader } from "./Shader";
//#endregion

GraphicsContext.create = function create<E extends HTMLElement = HTMLElement>(el: E): GraphicsContext {
    if (Renderer.getAPI() === RendererAPI.WebGL2) {
        return new WebGL2GraphicsContext(el);
    }
    
    // @ts-expect-error error build
    return null;
}

VertexBuffer.create = function create(vertices: ArrayBufferView, size: number): VertexBuffer {
    if (Renderer.getAPI() === RendererAPI.WebGL2) {
        return new WebGL2VertexBuffer(vertices, size);
    }
        
    // @ts-expect-error error build
    return null;
}
IndexBuffer.create = function create(indices: ArrayBufferView, size: number): IndexBuffer {
    if (Renderer.getAPI() === RendererAPI.WebGL2) {
        return new WebGL2IndexBuffer(indices, size);
    }

    // @ts-expect-error error build
    return null;
}

Shader.create = function create(vertexSource: string, fragmentSource: string): Shader {
    if (Renderer.getAPI() === RendererAPI.WebGL2) {
        return new WebGL2Shader(vertexSource, fragmentSource);
    }
    
    // @ts-expect-error error build
    return null;
}