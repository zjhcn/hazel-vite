import {
    Layer,
    Event,
    EventType,
    KeyEvent,
    Application,
    type WindowProps,
    DatGuiLayer,
    BufferElement,
    BufferLayout,
    ShaderDataType,
    IndexBuffer,
    VertexBuffer,
    VertexArray,
    Shader,
    RenderCommand,
    Renderer,
    AppUpdateEvent,
} from "@hazel/hazel";
import { KeyCodes } from "@hazel/share";

class WebGL2Layer extends Layer {
    constructor(name: string = "WebGL2") {
        super(name);
    }

    onAttach(): void {
        this.vertexArray = VertexArray.create();
        this.vertexArray.bind();

        // prettier-ignore
        const vertices= new Float32Array([
			-0.5, -0.5, 0.0, 0.8, 0.2, 0.8, 1.0,
			 0.5, -0.5, 0.0, 0.2, 0.3, 0.8, 1.0,
			 0.0,  0.5, 0.0, 0.8, 0.8, 0.2, 1.0,
		]);

        this.vertexBuffer = VertexBuffer.create(vertices, vertices.byteLength);

        this.vertexBuffer.setLayout(
            BufferLayout.create([
                new BufferElement(ShaderDataType.Float3, "a_Position"),
                new BufferElement(ShaderDataType.Float4, "a_Color"),
            ]),
        );
        this.vertexArray.addVertexBuffer(this.vertexBuffer);

        const indices = new Uint32Array([0, 1, 2]);
        this.indexBuffer = IndexBuffer.create(indices, indices.length);
        this.vertexArray.addIndexBuffer(this.indexBuffer);

        this.squareVA = VertexArray.create();

        // prettier-ignore
        const squareVertices= new Float32Array([
            -0.75, -0.75, 0.0,
             0.75, -0.75, 0.0,
             0.75,  0.75, 0.0,
            -0.75,  0.75, 0.0,
        ]);

        this.squareVB = VertexBuffer.create(
            squareVertices,
            squareVertices.length,
        );

        this.squareVB.setLayout(
            BufferLayout.create([
                new BufferElement(ShaderDataType.Float3, "a_Position"),
            ]),
        );
        this.squareVA.addVertexBuffer(this.squareVB);

        const squareIndices = new Uint32Array([0, 1, 2, 2, 3, 0]);
        this.squareIB = IndexBuffer.create(squareIndices, squareIndices.length);
        this.squareVA.addIndexBuffer(this.squareIB);

        const vertexSrc = `#version 300 es
            precision highp float;
			
			layout(location = 0) in vec3 a_Position;
			layout(location = 1) in vec4 a_Colot;

			out vec3 v_Position;
			out vec4 v_Color;

			void main()
			{
				v_Position = a_Position;
                v_Color = a_Colot;
				gl_Position = vec4(a_Position, 1.0);	
			}
		`;

        const fragmentSrc = `#version 300 es
            precision highp float;
			
			out vec4 color;

			in vec3 v_Position;
			in vec4 v_Color;

			void main()
			{
				color = vec4(v_Position * 0.5 + 0.5, 1.0);
                color = v_Color;
			}
		`;

        this.shader = Shader.create(vertexSrc, fragmentSrc);

        const squareVertexSrc = `#version 300 es
            precision highp float;
            
            layout(location = 0) in vec3 a_Position;

            out vec3 v_Position;

            void main()
            {
                v_Position = a_Position;
                gl_Position = vec4(a_Position, 1.0);	
            }
        `;

        const squareFragmentSrc = `#version 300 es
            precision highp float;
            
            out vec4 color;

            in vec3 v_Position;

            void main()
            {
                color = vec4(v_Position * 0.5 + 0.5, 1.0);
            }
        `;

        this.squareShader = Shader.create(squareVertexSrc, squareFragmentSrc);
    }
    onDetach(): void {}
    onUpdate(): void {
        RenderCommand.setClearColor([0.1, 0.1, 0.1, 1]);
        RenderCommand.clear();

        Renderer.beginScene();
        this.squareShader.bind();
        Renderer.submit(this.squareVA);

        this.shader.bind();
        Renderer.submit(this.vertexArray);

        Renderer.endScene();
    }

    onEvent(event: Event): void {
        if (event.getType() === EventType.KeyPressed) {
            const e = event as KeyEvent;
            if (e.getKeyCode() === KeyCodes.KeyS) {
                console.info("KeyS key is pressed (event)!");
            }
        }
    }

    // #region Private Fields
    vertexArray!: VertexArray;
    vertexBuffer!: VertexBuffer;
    indexBuffer!: IndexBuffer;
    shader!: Shader;
    squareShader!: Shader;
    squareIB!: IndexBuffer;
    squareVA!: VertexArray;
    squareVB!: VertexBuffer;
    //#endregion
}

export class SandboxApp extends Application {
    constructor(props: WindowProps) {
        super(props);
        this.pushLayer(new WebGL2Layer());
        this.pushLayer(new DatGuiLayer());
    }
}
