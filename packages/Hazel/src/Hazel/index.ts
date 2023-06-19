export * from "./AppWindow";
export * from "./Lifecycle";
export * from "./Loop";
export * from "./Layer";
export * from "./Events";
export * from "./Gui";
export * from "./Input";
export * from "./Renderer";

import { Application as _Application } from "./Application";
import { AppWindow, type WindowProps } from "./AppWindow";
import { Loop } from "./Loop";
import { Input } from "./Input";

//#region Platform Web
import { WebInput } from "@pw/Hazel/Platform/Web/WebInput";
import { WebLoop } from "@pw/Hazel/Platform/Web/WebLoop";
import { WebAppWindow } from "@pw/Hazel/Platform/Web/WebAppWindow";
import { WebApplication } from "@pw/Hazel/Platform/Web/WebApplication";
//#endregion

//#region Conditionals Create Methods
AppWindow.create = function create(props): AppWindow {
    if (import.meta.env.VITE_PLATFORM === "Web") {
        return new WebAppWindow(props)
    }
    
    // @ts-expect-error error build
    return null;
}

Input.create = function create(): Input {
    if (import.meta.env.VITE_PLATFORM === "Web") {
        return new WebInput()
    }
    
    // @ts-expect-error error build
    return null;
}

Loop.create = function create(): Loop {
    if (import.meta.env.VITE_PLATFORM === "Web") {
        return new WebLoop()
    }
    
    // @ts-expect-error error build
    return null;
}
//#endregion

//#region Conditionals export
let Application: typeof _Application;
if (import.meta.env.VITE_PLATFORM === "Web") {
    Application = WebApplication;
}

export { Application };
//#endregion
