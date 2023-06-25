//#region Hazel
import { Event } from "@pw/Hazel/Hazel/Events/Event";
import { Application } from "@pw/Hazel/Hazel/Application";
//#endregion

import { WebAppWindow, type WindowProps } from "./WebAppWindow";
import { WebLoop } from "./WebLoop";
import { WebInput } from "./WebInput";
import { Clock } from "@hazel/share";

export class WebApplication extends Application {
    static getInstance(): Application {
        return Application.getInstance();
    }

    constructor(props: WindowProps) {
        super(props);
        this.appWindow = WebAppWindow.create(props);
        this.appWindow.setEventCallback(this.onEvent.bind(this));
        this.#input = WebInput.create();
        this.#clock = new Clock();
    }

    run(): void {
        console.log("[Application] Hazel Application running...");
        this.#running = true;
        this.#loop.while(
            () => {
                const ts = this.#clock.getDeltaSecond()
                for (const layer of this.layerStack) {
                    layer.onUpdate(ts);
                }

                this.appWindow.onUpdate(ts);
            },
            () => (this.#running = false),
        );
    }

    onEvent(event: Event): void {
        for (const layer of this.layerStack) {
            layer.onEvent(event);
            if (event.handled) {
                break;
            }
        }
    }

    // #region Private Fields
    #input: WebInput;
    #running: boolean = true;
    #loop: WebLoop = WebLoop.create();
    #clock: Clock;
    //#endregion
}
