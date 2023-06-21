export { Application } from "./Hazel";

export { type WindowProps } from "./Hazel";

export {
    Input,
    Event,
    EventType,
    AppTickEvent,
    AppRenderEvent,
    AppUpdateEvent,
    KeyEvent,
    KeyTypedEvent,
    KeyPressedEvent,
    KeyReleasedEvent,
    MouseButtonEvent,
    MouseButtonPressedEvent,
    MouseButtonReleasedEvent,
    MouseMovedEvent,
    MouseScrolledEvent,
    WindowCloseEvent,
    WindowResizeEvent,
} from "./Hazel";

export { Layer, DatGuiLayer } from "./Hazel";

import { type WindowProps } from "./Hazel";
import type { Application } from "./Hazel/Application";

// To be defined in CLIENT
export type CreateApplication = (props: WindowProps) => Application;

//#region Renderer
export {
    Renderer,
    RenderCommand,
    BufferElement,
    BufferLayout,
    ShaderDataType,
    IndexBuffer,
    VertexBuffer,
    VertexArray,
    Shader,
} from "./Hazel";
//#endregion

//#region Camera
export { OrthographicCamera } from "./Hazel";
//#endregion
