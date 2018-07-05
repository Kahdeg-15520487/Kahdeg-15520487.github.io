/// <reference path="./bridge.d.ts" />

declare namespace renderCube {
    interface App {
    }
    interface AppFunc extends Function {
        prototype: App;
        new (): App;
        Main(): void;
    }
    var App: AppFunc;

    interface Canvas {
        canvas: number[];
        Width: number;
        Height: number;
        getItem(x: number, y: number): number;
        setItem(x: number, y: number, value: number): void;
        Render(): string;
        Clear(x0: number, y0: number, x1: number, y1: number): void;
        getHashCode(): number;
        equals(o: renderCube.Canvas): boolean;
        $clone(to: renderCube.Canvas): renderCube.Canvas;
    }
    interface CanvasFunc extends Function {
        prototype: Canvas;
        $ctor1: {
            new (width: number, height: number): Canvas
        };
        new (): Canvas;
        ctor: {
            new (): Canvas
        };
    }
    var Canvas: CanvasFunc;

    interface Cube {
        /**
         * 8 corner of the cube
         *
         * @instance
         * @public
         * @memberof renderCube.Cube
         * @function Corners
         * @type Array.<renderCube.Point>
         */
        Corners: renderCube.Point[];
        Width: number;
        Height: number;
        Depth: number;
        getHashCode(): number;
        equals(o: renderCube.Cube): boolean;
        $clone(to: renderCube.Cube): renderCube.Cube;
    }
    interface CubeFunc extends Function {
        prototype: Cube;
        $ctor1: {
            new (A: renderCube.Point, w: number, h: number, d: number): Cube
        };
        new (): Cube;
        ctor: {
            new (): Cube
        };
    }
    var Cube: CubeFunc;

    interface CubeRenderer {
    }
    interface CubeRendererFunc extends Function {
        prototype: CubeRenderer;
        new (): CubeRenderer;
        Render(canvas: renderCube.Canvas, cube: renderCube.Cube): void;
        Render$1(canvas: renderCube.Canvas, cube: renderCube.Cube, offset: renderCube.Point): void;
    }
    var CubeRenderer: CubeRendererFunc;

    interface LinearInterpolation {
    }
    interface LinearInterpolationFunc extends Function {
        prototype: LinearInterpolation;
        new (): LinearInterpolation;
        GetLine(start: renderCube.Point, end: renderCube.Point): System.Collections.Generic.List$1<renderCube.Point>;
    }
    var LinearInterpolation: LinearInterpolationFunc;

    interface LineRenderer {
    }
    interface LineRendererFunc extends Function {
        prototype: LineRenderer;
        new (): LineRenderer;
        Render$1(canvas: renderCube.Canvas, A: renderCube.Point, B: renderCube.Point, lineCharacter?: number): void;
        Render(canvas: renderCube.Canvas, A: renderCube.Point, B: renderCube.Point, offset: renderCube.Point, lineCharacter?: number): void;
    }
    var LineRenderer: LineRendererFunc;

    interface Point {
        X: number;
        Y: number;
        toString(): string;
        getHashCode(): number;
        equals(o: renderCube.Point): boolean;
        $clone(to: renderCube.Point): renderCube.Point;
    }
    interface PointFunc extends Function {
        prototype: Point;
        $ctor1: {
            new (x: number, y: number): Point
        };
        new (): Point;
        ctor: {
            new (): Point
        };
        Zero: renderCube.Point;
        op_Addition(p: renderCube.Point, vt: renderCube.Vector2D): renderCube.Point;
        op_Subtraction(p: renderCube.Point, vt: renderCube.Vector2D): renderCube.Point;
    }
    var Point: PointFunc;

    interface Rectangle {
        /**
         * 4 corner of the rectangle
         *
         * @instance
         * @public
         * @memberof renderCube.Rectangle
         * @function Corners
         * @type Array.<renderCube.Point>
         */
        Corners: renderCube.Point[];
        Width: number;
        Height: number;
        getHashCode(): number;
        equals(o: renderCube.Rectangle): boolean;
        $clone(to: renderCube.Rectangle): renderCube.Rectangle;
    }
    interface RectangleFunc extends Function {
        prototype: Rectangle;
        $ctor1: {
            new (A: renderCube.Point, w: number, h: number): Rectangle
        };
        new (): Rectangle;
        ctor: {
            new (): Rectangle
        };
    }
    var Rectangle: RectangleFunc;

    interface RectangleRenderer {
    }
    interface RectangleRendererFunc extends Function {
        prototype: RectangleRenderer;
        new (): RectangleRenderer;
        Render$1(canvas: renderCube.Canvas, rect: renderCube.Rectangle): void;
        Render$2(canvas: renderCube.Canvas, rect: renderCube.Rectangle, offset: renderCube.Point): void;
        Render(canvas: renderCube.Canvas, A: renderCube.Point, B: renderCube.Point, C: renderCube.Point, D: renderCube.Point, offset: renderCube.Point): void;
    }
    var RectangleRenderer: RectangleRendererFunc;

    interface Vector2D {
        X: number;
        Y: number;
        Magnitude: number;
        Normalize(): void;
        getHashCode(): number;
        equals(o: renderCube.Vector2D): boolean;
        $clone(to: renderCube.Vector2D): renderCube.Vector2D;
    }
    interface Vector2DFunc extends Function {
        prototype: Vector2D;
        $ctor2: {
            new (x: number, y: number): Vector2D
        };
        $ctor1: {
            new (x: number): Vector2D
        };
        new (): Vector2D;
        ctor: {
            new (): Vector2D
        };
        Up: renderCube.Vector2D;
        Down: renderCube.Vector2D;
        Left: renderCube.Vector2D;
        Right: renderCube.Vector2D;
        op_Explicit(vt3D: renderCube.Vector3D): renderCube.Vector2D;
        op_Addition(a: renderCube.Vector2D, b: renderCube.Vector2D): renderCube.Vector2D;
        op_Subtraction(a: renderCube.Vector2D, b: renderCube.Vector2D): renderCube.Vector2D;
    }
    var Vector2D: Vector2DFunc;

    interface Vector3D {
        X: number;
        Y: number;
        Z: number;
        Magnitude: number;
        Normalize(): void;
        getHashCode(): number;
        equals(o: renderCube.Vector3D): boolean;
        $clone(to: renderCube.Vector3D): renderCube.Vector3D;
    }
    interface Vector3DFunc extends Function {
        prototype: Vector3D;
        $ctor1: {
            new (x: number, y: number, z: number): Vector3D
        };
        new (): Vector3D;
        ctor: {
            new (): Vector3D
        };
        op_Implicit(vt2D: renderCube.Vector2D): renderCube.Vector3D;
    }
    var Vector3D: Vector3DFunc;
}
