/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.1
 */
Bridge.assembly("renderCube", function ($asm, globals) {
    "use strict";

    Bridge.define("renderCube.App", {
        main: function Main () {
            var $t;
            var canvas = ($t = document.createElement("textarea"), $t.id = "canvas", $t.readOnly = true, $t.rows = 50, $t.cols = 50, $t);

            var div = document.createElement("div");

            var inputX = ($t = document.createElement("input"), $t.type = "number", $t.defaultValue = "0", $t.value = "8", $t);
            var inputY = ($t = document.createElement("input"), $t.type = "number", $t.defaultValue = "0", $t.value = "7", $t);
            var inputZ = ($t = document.createElement("input"), $t.type = "number", $t.defaultValue = "0", $t.value = "6", $t);

            var button = ($t = document.createElement("button"), $t.innerHTML = "Render", $t.onclick = function (ev) {
                var cv = new renderCube.Canvas.$ctor1(50, 50);
                var x = { };
                var y = { };
                var z = { };

                if (System.Double.tryParse(inputX.value, null, x) && System.Double.tryParse(inputY.value, null, y) && System.Double.tryParse(inputZ.value, null, z)) {
                    renderCube.App.cube = new renderCube.Cube.$ctor1(renderCube.Point.Zero.$clone(), x.v, y.v, z.v);
                }

                renderCube.CubeRenderer.Render(cv, renderCube.App.cube.$clone());

                canvas.innerHTML = cv.Render();
            }, $t);

            div.appendChild(inputX);
            div.appendChild(document.createElement("br"));
            div.appendChild(inputY);
            div.appendChild(document.createElement("br"));
            div.appendChild(inputZ);
            div.appendChild(document.createElement("br"));
            div.appendChild(button);
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("hr"));
            document.body.appendChild(canvas);
        },
        statics: {
            fields: {
                cube: null,
                rect: null
            },
            ctors: {
                init: function () {
                    this.cube = new renderCube.Cube();
                    this.rect = new renderCube.Rectangle();
                    this.cube = new renderCube.Cube.$ctor1(renderCube.Point.Zero.$clone(), 8, 7, 6);
                    this.rect = new renderCube.Rectangle.$ctor1(renderCube.Point.Zero.$clone(), 5, 5);
                }
            }
        }
    });

    Bridge.define("renderCube.Canvas", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new renderCube.Canvas(); }
            }
        },
        fields: {
            canvas: null,
            Width: 0,
            Height: 0
        },
        ctors: {
            $ctor1: function (width, height) {
                this.$initialize();
                this.canvas = System.Array.create(0, null, System.Char, width, height);
                this.Width = width;
                this.Height = height;
                for (var y = 0; y < height; y = (y + 1) | 0) {
                    for (var x = 0; x < width; x = (x + 1) | 0) {
                        this.canvas.set([x, y], 32);
                    }
                }
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getItem: function (x, y) {
                return this.canvas.get([x, y]);
            },
            setItem: function (x, y, value) {
                try {
                    this.canvas.set([x, y], value);
                }
                catch (e) {
                    e = System.Exception.create(e);
                    System.Console.WriteLine(System.String.format("x={0};y={1}", Bridge.box(x, System.Int32), Bridge.box(y, System.Int32)));
                }
            },
            Render: function () {
                var sb = new System.Text.StringBuilder();
                var sw = new System.IO.StringWriter.$ctor2(sb);
                try {
                    for (var y = 0; y < this.Height; y = (y + 1) | 0) {
                        for (var x = 0; x < this.Width; x = (x + 1) | 0) {
                            sw.Write$1(this.canvas.get([x, y]));
                        }
                        sw.WriteLine();
                    }
                }
                finally {
                    if (Bridge.hasValue(sw)) {
                        sw.System$IDisposable$Dispose();
                    }
                }
                return sb.toString();
            },
            Clear: function (x0, y0, x1, y1) {
                for (var y = y0; y < y1; y = (y + 1) | 0) {
                    for (var x = x0; x < x1; x = (x + 1) | 0) {
                        this.canvas.set([x, y], 32);
                    }
                }
            },
            getHashCode: function () {
                var h = Bridge.addHash([1986974884, this.canvas, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Canvas)) {
                    return false;
                }
                return Bridge.equals(this.canvas, o.canvas) && Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new renderCube.Canvas();
                s.canvas = this.canvas;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("renderCube.Cube", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new renderCube.Cube(); }
            }
        },
        fields: {
            /**
             * 8 corner of the cube
             *
             * @instance
             * @public
             * @memberof renderCube.Cube
             * @function Corners
             * @type Array.<renderCube.Point>
             */
            Corners: null,
            Width: 0,
            Height: 0,
            Depth: 0
        },
        ctors: {
            $ctor1: function (A, w, h, d) {
                var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7;
                this.$initialize();
                this.Corners = System.Array.init(8, function (){
                    return new renderCube.Point();
                }, renderCube.Point);
                ($t = this.Corners)[System.Array.index(0, $t)] = A.$clone();
                ($t1 = this.Corners)[System.Array.index(1, $t1)] = new renderCube.Point.$ctor1(A.X + w, A.Y);
                ($t2 = this.Corners)[System.Array.index(2, $t2)] = new renderCube.Point.$ctor1(A.X + w, A.Y + h);
                ($t3 = this.Corners)[System.Array.index(3, $t3)] = new renderCube.Point.$ctor1(A.X, A.Y + h);

                var depthVector = new renderCube.Vector2D.$ctor1(d);

                ($t4 = this.Corners)[System.Array.index(4, $t4)] = renderCube.Point.op_Addition(A.$clone(), depthVector.$clone());
                ($t5 = this.Corners)[System.Array.index(5, $t5)] = renderCube.Point.op_Addition(new renderCube.Point.$ctor1(A.X + w, A.Y), depthVector.$clone());
                ($t6 = this.Corners)[System.Array.index(6, $t6)] = renderCube.Point.op_Addition(new renderCube.Point.$ctor1(A.X + w, A.Y + h), depthVector.$clone());
                ($t7 = this.Corners)[System.Array.index(7, $t7)] = renderCube.Point.op_Addition(new renderCube.Point.$ctor1(A.X, A.Y + h), depthVector.$clone());

                this.Width = w;
                this.Height = h;
                this.Depth = d;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1700951363, this.Corners, this.Width, this.Height, this.Depth]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Cube)) {
                    return false;
                }
                return Bridge.equals(this.Corners, o.Corners) && Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height) && Bridge.equals(this.Depth, o.Depth);
            },
            $clone: function (to) {
                var s = to || new renderCube.Cube();
                s.Corners = this.Corners;
                s.Width = this.Width;
                s.Height = this.Height;
                s.Depth = this.Depth;
                return s;
            }
        }
    });

    Bridge.define("renderCube.CubeRenderer", {
        statics: {
            methods: {
                Render: function (canvas, cube) {
                    renderCube.CubeRenderer.Render$1(canvas, cube.$clone(), renderCube.Point.Zero.$clone());
                },
                Render$1: function (canvas, cube, offset) {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7;
                    var A = ($t = cube.Corners)[System.Array.index(0, $t)].$clone();
                    var B = ($t1 = cube.Corners)[System.Array.index(1, $t1)].$clone();
                    var C = ($t2 = cube.Corners)[System.Array.index(2, $t2)].$clone();
                    var D = ($t3 = cube.Corners)[System.Array.index(3, $t3)].$clone();

                    var A_ = ($t4 = cube.Corners)[System.Array.index(4, $t4)].$clone();
                    var B_ = ($t5 = cube.Corners)[System.Array.index(5, $t5)].$clone();
                    var C_ = ($t6 = cube.Corners)[System.Array.index(6, $t6)].$clone();
                    var D_ = ($t7 = cube.Corners)[System.Array.index(7, $t7)].$clone();

                    var depthVector = new renderCube.Vector2D.$ctor1(cube.Depth);
                    var unitVector = new renderCube.Vector2D.$ctor1(1);

                    renderCube.RectangleRenderer.Render(canvas, A.$clone(), B.$clone(), C.$clone(), D.$clone(), offset.$clone());
                    renderCube.RectangleRenderer.Render(canvas, A_.$clone(), B_.$clone(), C_.$clone(), D_.$clone(), offset.$clone());

                    renderCube.LineRenderer.Render$1(canvas, renderCube.Point.op_Addition(A.$clone(), unitVector.$clone()), renderCube.Point.op_Subtraction(A_.$clone(), unitVector.$clone()), 92);
                    renderCube.LineRenderer.Render$1(canvas, renderCube.Point.op_Addition(B.$clone(), unitVector.$clone()), renderCube.Point.op_Subtraction(B_.$clone(), unitVector.$clone()), 92);
                    renderCube.LineRenderer.Render$1(canvas, renderCube.Point.op_Addition(C.$clone(), unitVector.$clone()), renderCube.Point.op_Subtraction(C_.$clone(), unitVector.$clone()), 92);
                    renderCube.LineRenderer.Render$1(canvas, renderCube.Point.op_Addition(D.$clone(), unitVector.$clone()), renderCube.Point.op_Subtraction(D_.$clone(), unitVector.$clone()), 92);
                }
            }
        }
    });

    Bridge.define("renderCube.LinearInterpolation", {
        statics: {
            methods: {
                lerp: function (start, end, t) {
                    return start + t * (end - start);
                },
                lerp_point: function (p0, p1, t) {
                    return new renderCube.Point.$ctor1(renderCube.LinearInterpolation.lerp(p0.X, p1.X, t), renderCube.LinearInterpolation.lerp(p0.Y, p1.Y, t));
                },
                diagonal_distance: function (p0, p1) {
                    var dx = p1.X - p0.X;
                    var dy = p1.Y - p0.Y;
                    return Math.max(Math.abs(dx), Math.abs(dy));
                },
                round_point: function (p) {
                    return new renderCube.Point.$ctor1(Bridge.Math.round(p.X, 0, 1), Bridge.Math.round(p.Y, 0, 1));
                },
                GetLine: function (start, end) {
                    var points = new (System.Collections.Generic.List$1(renderCube.Point)).ctor();
                    var N = renderCube.LinearInterpolation.diagonal_distance(start.$clone(), end.$clone());
                    for (var step = 0; step <= N; step = (step + 1) | 0) {
                        var t = N === 0 ? 0.0 : step / N;
                        points.add(renderCube.LinearInterpolation.round_point(renderCube.LinearInterpolation.lerp_point(start.$clone(), end.$clone(), t)));
                    }
                    return points;
                }
            }
        }
    });

    Bridge.define("renderCube.LineRenderer", {
        statics: {
            methods: {
                Render$1: function (canvas, A, B, lineCharacter) {
                    if (lineCharacter === void 0) { lineCharacter = 42; }
                    renderCube.LineRenderer.Render(canvas, A.$clone(), B.$clone(), renderCube.Point.Zero.$clone(), lineCharacter);
                },
                Render: function (canvas, A, B, offset, lineCharacter) {
                    var $t;
                    if (lineCharacter === void 0) { lineCharacter = 42; }
                    var line = renderCube.LinearInterpolation.GetLine(A.$clone(), B.$clone());
                    $t = Bridge.getEnumerator(line);
                    try {
                        while ($t.moveNext()) {
                            var p = $t.Current.$clone();
                            var xOS = Bridge.Int.clip32(p.X + offset.X);
                            var yOS = Bridge.Int.clip32(p.Y + offset.Y);
                            canvas.setItem(xOS, yOS, lineCharacter);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}
            }
        }
    });

    Bridge.define("renderCube.Point", {
        $kind: "struct",
        statics: {
            fields: {
                Zero: null
            },
            ctors: {
                init: function () {
                    this.Zero = new renderCube.Point();
                    this.Zero = new renderCube.Point.$ctor1(0, 0);
                }
            },
            methods: {
                op_Addition: function (p, vt) {
                    return new renderCube.Point.$ctor1(p.X + vt.X, p.Y + vt.Y);
                },
                op_Subtraction: function (p, vt) {
                    return new renderCube.Point.$ctor1(p.X - vt.X, p.Y - vt.Y);
                },
                getDefaultValue: function () { return new renderCube.Point(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return System.String.format("x={0};y={1}", Bridge.box(this.X, System.Double, System.Double.format, System.Double.getHashCode), Bridge.box(this.Y, System.Double, System.Double.format, System.Double.getHashCode));
            },
            getHashCode: function () {
                var h = Bridge.addHash([1852403652, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Point)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new renderCube.Point();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("renderCube.Rectangle", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new renderCube.Rectangle(); }
            }
        },
        fields: {
            /**
             * 4 corner of the rectangle
             *
             * @instance
             * @public
             * @memberof renderCube.Rectangle
             * @function Corners
             * @type Array.<renderCube.Point>
             */
            Corners: null,
            Width: 0,
            Height: 0
        },
        ctors: {
            $ctor1: function (A, w, h) {
                var $t, $t1, $t2, $t3;
                this.$initialize();
                this.Corners = System.Array.init(4, function (){
                    return new renderCube.Point();
                }, renderCube.Point);

                ($t = this.Corners)[System.Array.index(0, $t)] = A.$clone();
                ($t1 = this.Corners)[System.Array.index(1, $t1)] = new renderCube.Point.$ctor1(A.X + w, A.Y);
                ($t2 = this.Corners)[System.Array.index(2, $t2)] = new renderCube.Point.$ctor1(A.X + w, A.Y + h);
                ($t3 = this.Corners)[System.Array.index(3, $t3)] = new renderCube.Point.$ctor1(A.X, A.Y + h);

                this.Width = w;
                this.Height = h;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3771388952, this.Corners, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Rectangle)) {
                    return false;
                }
                return Bridge.equals(this.Corners, o.Corners) && Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new renderCube.Rectangle();
                s.Corners = this.Corners;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("renderCube.RectangleRenderer", {
        statics: {
            methods: {
                Render$1: function (canvas, rect) {
                    renderCube.RectangleRenderer.Render$2(canvas, rect.$clone(), renderCube.Point.Zero.$clone());
                },
                Render$2: function (canvas, rect, offset) {
                    var $t, $t1, $t2, $t3;
                    var A = ($t = rect.Corners)[System.Array.index(0, $t)].$clone();
                    var B = ($t1 = rect.Corners)[System.Array.index(1, $t1)].$clone();
                    var C = ($t2 = rect.Corners)[System.Array.index(2, $t2)].$clone();
                    var D = ($t3 = rect.Corners)[System.Array.index(3, $t3)].$clone();



                    renderCube.RectangleRenderer.Render(canvas, A.$clone(), B.$clone(), C.$clone(), D.$clone(), offset.$clone());
                },
                Render: function (canvas, A, B, C, D, offset) {
                    var $t;
                    $t = Bridge.getEnumerator(System.Array.init([A.$clone(), B.$clone(), C.$clone(), D.$clone()], renderCube.Point));
                    try {
                        while ($t.moveNext()) {
                            var corner = $t.Current.$clone();
                            var xOS = Bridge.Int.clip32(corner.X + offset.X);
                            var yOS = Bridge.Int.clip32(corner.Y + offset.Y);
                            canvas.canvas.set([xOS, yOS], 42);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    renderCube.LineRenderer.Render(canvas, renderCube.Point.op_Addition(A.$clone(), renderCube.Vector2D.Right.$clone()), renderCube.Point.op_Addition(B.$clone(), renderCube.Vector2D.Left.$clone()), offset.$clone(), 45);
                    renderCube.LineRenderer.Render(canvas, renderCube.Point.op_Addition(B.$clone(), renderCube.Vector2D.Up.$clone()), renderCube.Point.op_Addition(C.$clone(), renderCube.Vector2D.Down.$clone()), offset.$clone(), 124);
                    renderCube.LineRenderer.Render(canvas, renderCube.Point.op_Addition(C.$clone(), renderCube.Vector2D.Left.$clone()), renderCube.Point.op_Addition(D.$clone(), renderCube.Vector2D.Right.$clone()), offset.$clone(), 45);
                    renderCube.LineRenderer.Render(canvas, renderCube.Point.op_Addition(D.$clone(), renderCube.Vector2D.Down.$clone()), renderCube.Point.op_Addition(A.$clone(), renderCube.Vector2D.Up.$clone()), offset.$clone(), 124);
                }
            }
        }
    });

    Bridge.define("renderCube.Vector2D", {
        $kind: "struct",
        statics: {
            fields: {
                Up: null,
                Down: null,
                Left: null,
                Right: null
            },
            ctors: {
                init: function () {
                    this.Up = new renderCube.Vector2D();
                    this.Down = new renderCube.Vector2D();
                    this.Left = new renderCube.Vector2D();
                    this.Right = new renderCube.Vector2D();
                    this.Up = new renderCube.Vector2D.$ctor2(0, 1);
                    this.Down = new renderCube.Vector2D.$ctor2(0, -1);
                    this.Left = new renderCube.Vector2D.$ctor2(-1, 0);
                    this.Right = new renderCube.Vector2D.$ctor2(1, 0);
                }
            },
            methods: {
                op_Explicit: function (vt3D) {
                    return new renderCube.Vector2D.$ctor2(vt3D.X, vt3D.Y);
                },
                op_Addition: function (a, b) {
                    return new renderCube.Vector2D.$ctor2(a.X + b.X, a.Y + b.Y);
                },
                op_Subtraction: function (a, b) {
                    return new renderCube.Vector2D.$ctor2(a.X - b.X, a.Y - b.Y);
                },
                getDefaultValue: function () { return new renderCube.Vector2D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        props: {
            Magnitude: {
                get: function () {
                    return Math.sqrt(this.X * this.X + this.Y * this.Y);
                }
            }
        },
        ctors: {
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            $ctor1: function (x) {
                this.$initialize();
                this.X = x;
                this.Y = x;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Normalize: function () {
                var mag = this.Magnitude;
                this.X /= mag;
                this.Y /= mag;
            },
            getHashCode: function () {
                var h = Bridge.addHash([3096827845, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Vector2D)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new renderCube.Vector2D();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("renderCube.Vector3D", {
        $kind: "struct",
        statics: {
            methods: {
                op_Implicit: function (vt2D) {
                    return new renderCube.Vector3D.$ctor1(vt2D.X, vt2D.Y, 0);
                },
                getDefaultValue: function () { return new renderCube.Vector3D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            Z: 0
        },
        props: {
            Magnitude: {
                get: function () {
                    return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
                }
            }
        },
        ctors: {
            $ctor1: function (x, y, z) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Normalize: function () {
                var mag = this.Magnitude;
                this.X /= mag;
                this.Y /= mag;
                this.Z /= mag;
            },
            getHashCode: function () {
                var h = Bridge.addHash([3096893381, this.X, this.Y, this.Z]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, renderCube.Vector3D)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this.Z, o.Z);
            },
            $clone: function (to) {
                var s = to || new renderCube.Vector3D();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                return s;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZW5kZXJDdWJlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJDb2RlRmlsZTEuY3MiLCJMaW5lYXJJbnRlcnBvbGF0aW9uLmNzIiwiVmVjdG9yMkQuY3MiLCJWZWN0b3IzRC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUFlWUEsYUFBYUE7O1lBUWJBLFVBQVVBOztZQUVWQSxhQUFhQSxpREFFRkE7WUFJWEEsYUFBYUEsaURBRUZBO1lBSVhBLGFBQWFBLGlEQUVGQTs7WUFLWEEsYUFBYUEsOEVBR0NBLFVBQUNBO2dCQUVQQSxTQUFZQSxJQUFJQTtnQkFDcENBO2dCQUNBQTtnQkFDQUE7O2dCQUVvQkEsSUFBSUEsdUJBQWdCQSxvQkFBa0JBLE1BQ2xDQSx1QkFBZ0JBLG9CQUFrQkEsTUFDbENBLHVCQUFnQkEsb0JBQWtCQTtvQkFFbENBLHNCQUFPQSxJQUFJQSx1QkFBS0EsZ0NBQVlBLEtBQUdBLEtBQUdBOzs7Z0JBR3RDQSwrQkFBb0JBLElBQUlBOztnQkFFeEJBLG1CQUFtQkE7OztZQUszQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsZ0JBQWdCQTtZQUNoQkEsMEJBQTBCQTtZQUMxQkEsMEJBQTBCQTtZQUMxQkEsMEJBQTBCQTs7Ozs7Ozs7Ozs7Z0NBbkVYQSxJQUFJQSx1QkFBS0E7Z0NBQ0pBLElBQUlBLDRCQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkNzR3hCQSxPQUFXQTs7Z0JBRXJCQSxjQUFTQSwwQ0FBU0EsT0FBT0E7Z0JBQ3pCQSxhQUFRQTtnQkFDUkEsY0FBU0E7Z0JBQ1RBLEtBQUtBLFdBQVdBLElBQUlBLFFBQVFBO29CQUV4QkEsS0FBS0EsV0FBV0EsSUFBSUEsT0FBT0E7d0JBRXZCQSxpQkFBT0EsR0FBR0E7Ozs7Ozs7Ozsr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O2dCQWFKQSxVQUFVQTtnQkFDVkEsVUFBS0E7Z0JBQ0xBLFVBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQ0NnQ0E7b0JBRXJDQSxPQUFPQSxJQUFJQSwyQkFBU0EsUUFBUUE7Ozs7Ozs7Ozs7Ozs7b0JBZHhCQSxPQUFPQSxVQUFVQSxTQUFJQSxTQUFJQSxTQUFJQSxTQUFJQSxTQUFJQTs7Ozs7OEJBWDdCQSxHQUFVQSxHQUFVQTs7Z0JBRWhDQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLFNBQUlBOzs7Ozs7OztnQkFhSkEsVUFBVUE7Z0JBQ1ZBLFVBQUtBO2dCQUNMQSxVQUFLQTtnQkFDTEEsVUFBS0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uSU87XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgcmVuZGVyQ3ViZVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBDdWJlIGN1YmUgPSBuZXcgQ3ViZShQb2ludC5aZXJvLCA4LCA3LCA2KTtcclxuICAgICAgICBzdGF0aWMgUmVjdGFuZ2xlIHJlY3QgPSBuZXcgUmVjdGFuZ2xlKFBvaW50Llplcm8sIDUsIDUpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gbmV3IEhUTUxUZXh0QXJlYUVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSWQgPSBcImNhbnZhc1wiLFxyXG4gICAgICAgICAgICAgICAgUmVhZE9ubHkgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgUm93cyA9IDUwLFxyXG4gICAgICAgICAgICAgICAgQ29scyA9IDUwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2ID0gbmV3IEhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5wdXRYID0gbmV3IEhUTUxJbnB1dEVsZW1lbnQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlID0gSW5wdXRUeXBlLk51bWJlcixcclxuICAgICAgICAgICAgICAgIERlZmF1bHRWYWx1ZSA9IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgVmFsdWUgPSBcIjhcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGlucHV0WSA9IG5ldyBIVE1MSW5wdXRFbGVtZW50KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHlwZSA9IElucHV0VHlwZS5OdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBEZWZhdWx0VmFsdWUgPSBcIjBcIixcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gXCI3XCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGlucHV0WiA9IG5ldyBIVE1MSW5wdXRFbGVtZW50KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHlwZSA9IElucHV0VHlwZS5OdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBEZWZhdWx0VmFsdWUgPSBcIjBcIixcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gXCI2XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXR0b24gPSBuZXcgSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gXCJSZW5kZXJcIixcclxuICAgICAgICAgICAgICAgIE9uQ2xpY2sgPSAoZXYpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzIGN2ID0gbmV3IENhbnZhcyg1MCwgNTApO1xyXG5kb3VibGUgeDtcbmRvdWJsZSB5O1xuZG91YmxlIHo7XG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG91YmxlLlRyeVBhcnNlKGlucHV0WC5WYWx1ZSwgb3V0IHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICYmIGRvdWJsZS5UcnlQYXJzZShpbnB1dFkuVmFsdWUsIG91dCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAmJiBkb3VibGUuVHJ5UGFyc2UoaW5wdXRaLlZhbHVlLCBvdXQgeikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdWJlID0gbmV3IEN1YmUoUG9pbnQuWmVybywgeCwgeSwgeik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBDdWJlUmVuZGVyZXIuUmVuZGVyKGN2LCBjdWJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLklubmVySFRNTCA9IGN2LlJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBCdXR0b24gdG8gdGhlIHBhZ2VcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGlucHV0WCk7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGlucHV0WSk7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGlucHV0Wik7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChuZXcgSFRNTEhSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSByZW5kZXJDdWJlXHJcbntcclxuICAgIHN0cnVjdCBQb2ludFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgWDtcclxuICAgICAgICBwdWJsaWMgZG91YmxlIFk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludChkb3VibGUgeCwgZG91YmxlIHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50IG9wZXJhdG9yICsoUG9pbnQgcCwgVmVjdG9yMkQgdnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KHAuWCArIHZ0LlgsIHAuWSArIHZ0LlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQb2ludCBvcGVyYXRvciAtKFBvaW50IHAsIFZlY3RvcjJEIHZ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludChwLlggLSB2dC5YLCBwLlkgLSB2dC5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUG9pbnQgWmVybyA9IG5ldyBQb2ludCgwLCAwKTtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIng9ezB9O3k9ezF9XCIsWCxZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RydWN0IFJlY3RhbmdsZVxyXG4gICAge1xyXG4gICAgICAgIC8qIEEtLS0tQlxyXG4gICAgICAgICAqIHwgICAgfFxyXG4gICAgICAgICAqIHwgICAgfFxyXG4gICAgICAgICAqIHwgICAgfFxyXG4gICAgICAgICAqIEQtLS0tQ1xyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIDQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBQb2ludFtdIENvcm5lcnMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlY3RhbmdsZShQb2ludCBBLCBkb3VibGUgdywgZG91YmxlIGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb3JuZXJzID0gbmV3IFBvaW50WzRdO1xyXG5cclxuICAgICAgICAgICAgQ29ybmVyc1swXSA9IEE7XHJcbiAgICAgICAgICAgIENvcm5lcnNbMV0gPSBuZXcgUG9pbnQoQS5YICsgdywgQS5ZKTtcclxuICAgICAgICAgICAgQ29ybmVyc1syXSA9IG5ldyBQb2ludChBLlggKyB3LCBBLlkgKyBoKTtcclxuICAgICAgICAgICAgQ29ybmVyc1szXSA9IG5ldyBQb2ludChBLlgsIEEuWSArIGgpO1xyXG5cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdHJ1Y3QgQ3ViZVxyXG4gICAge1xyXG4gICAgICAgIC8qIEEtLS0tLUJcclxuICAgICAgICAgKiB8IFxcICAgfFxcXHJcbiAgICAgICAgICogfCAgXFwgIHwgXFxcclxuICAgICAgICAgKiBELS0tXFwtQyAgXFxcclxuICAgICAgICAgKiAgXFwgICBcXCBcXCAgXFxcclxuICAgICAgICAgKiAgIFxcIEEnLS0tLUInXHJcbiAgICAgICAgICogICAgXFwgfCAgIFxcIHxcclxuICAgICAgICAgKiAgICAgXFx8ICAgIFxcfFxyXG4gICAgICAgICAqICAgICBEJy0tLS0tYydcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA4IGNvcm5lciBvZiB0aGUgY3ViZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFBvaW50W10gQ29ybmVycyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFdpZHRoIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgRGVwdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDdWJlKFBvaW50IEEsIGRvdWJsZSB3LCBkb3VibGUgaCwgZG91YmxlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb3JuZXJzID0gbmV3IFBvaW50WzhdO1xyXG4gICAgICAgICAgICBDb3JuZXJzWzBdID0gQTtcclxuICAgICAgICAgICAgQ29ybmVyc1sxXSA9IG5ldyBQb2ludChBLlggKyB3LCBBLlkpO1xyXG4gICAgICAgICAgICBDb3JuZXJzWzJdID0gbmV3IFBvaW50KEEuWCArIHcsIEEuWSArIGgpO1xyXG4gICAgICAgICAgICBDb3JuZXJzWzNdID0gbmV3IFBvaW50KEEuWCwgQS5ZICsgaCk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyRCBkZXB0aFZlY3RvciA9IG5ldyBWZWN0b3IyRChkKTtcclxuXHJcbiAgICAgICAgICAgIENvcm5lcnNbNF0gPSBBICsgZGVwdGhWZWN0b3I7XHJcbiAgICAgICAgICAgIENvcm5lcnNbNV0gPSBuZXcgUG9pbnQoQS5YICsgdywgQS5ZKSArIGRlcHRoVmVjdG9yO1xyXG4gICAgICAgICAgICBDb3JuZXJzWzZdID0gbmV3IFBvaW50KEEuWCArIHcsIEEuWSArIGgpICsgZGVwdGhWZWN0b3I7XHJcbiAgICAgICAgICAgIENvcm5lcnNbN10gPSBuZXcgUG9pbnQoQS5YLCBBLlkgKyBoKSArIGRlcHRoVmVjdG9yO1xyXG5cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG4gICAgICAgICAgICBEZXB0aCA9IGQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0cnVjdCBDYW52YXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhclssXSBjYW52YXM7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IEhlaWdodDtcclxuXHJcbiAgICAgICAgcHVibGljIENhbnZhcyhpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzW3gsIHldID0gJyAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhciB0aGlzW2ludCB4LCBpbnQgeV1cclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhc1t4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIHRyeVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzW3gsIHldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHN0cmluZy5Gb3JtYXQoXCJ4PXswfTt5PXsxfVwiLHgseSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICB1c2luZyAoU3RyaW5nV3JpdGVyIHN3ID0gbmV3IFN0cmluZ1dyaXRlcihzYikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgSGVpZ2h0OyB5KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBXaWR0aDsgeCsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3cuV3JpdGUoY2FudmFzW3gsIHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3cuV3JpdGVMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbGVhcihpbnQgeDAsIGludCB5MCwgaW50IHgxLCBpbnQgeTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0geTA7IHkgPCB5MTsgeSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0geDA7IHggPCB4MTsgeCsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc1t4LCB5XSA9ICcgJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIExpbmVSZW5kZXJlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW5kZXIoQ2FudmFzIGNhbnZhcywgUG9pbnQgQSwgUG9pbnQgQiwgY2hhciBsaW5lQ2hhcmFjdGVyID0gJyonKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVuZGVyKGNhbnZhcywgQSwgQiwgUG9pbnQuWmVybywgbGluZUNoYXJhY3Rlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVuZGVyKENhbnZhcyBjYW52YXMsIFBvaW50IEEsIFBvaW50IEIsIFBvaW50IG9mZnNldCwgY2hhciBsaW5lQ2hhcmFjdGVyID0gJyonKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBMaW5lYXJJbnRlcnBvbGF0aW9uLkdldExpbmUoQSwgQik7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBwIGluIGxpbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB4T1MgPSAoaW50KShwLlggKyBvZmZzZXQuWCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgeU9TID0gKGludCkocC5ZICsgb2Zmc2V0LlkpO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzW3hPUywgeU9TXSA9IGxpbmVDaGFyYWN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUmVjdGFuZ2xlUmVuZGVyZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVuZGVyKENhbnZhcyBjYW52YXMsIFJlY3RhbmdsZSByZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVuZGVyKGNhbnZhcywgcmVjdCwgUG9pbnQuWmVybyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVuZGVyKENhbnZhcyBjYW52YXMsIFJlY3RhbmdsZSByZWN0LCBQb2ludCBvZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgQSA9IHJlY3QuQ29ybmVyc1swXTtcclxuICAgICAgICAgICAgdmFyIEIgPSByZWN0LkNvcm5lcnNbMV07XHJcbiAgICAgICAgICAgIHZhciBDID0gcmVjdC5Db3JuZXJzWzJdO1xyXG4gICAgICAgICAgICB2YXIgRCA9IHJlY3QuQ29ybmVyc1szXTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciB4MCA9IChpbnQpKEEuWCArIG9mZnNldC5YKTtcclxuICAgICAgICAgICAgLy92YXIgeTAgPSAoaW50KShBLlkgKyBvZmZzZXQuWSk7XHJcbiAgICAgICAgICAgIC8vdmFyIHgxID0gKGludCkoQy5YICsgb2Zmc2V0LlgpO1xyXG4gICAgICAgICAgICAvL3ZhciB5MSA9IChpbnQpKEMuWSArIG9mZnNldC5ZKTtcclxuICAgICAgICAgICAgLy9jYW52YXMuQ2xlYXIoeDAsIHkwLCB4MSwgeTEpO1xyXG5cclxuICAgICAgICAgICAgUmVuZGVyKGNhbnZhcywgQSwgQiwgQywgRCwgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW5kZXIoQ2FudmFzIGNhbnZhcywgUG9pbnQgQSwgUG9pbnQgQiwgUG9pbnQgQywgUG9pbnQgRCwgUG9pbnQgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNvcm5lciBpbiBuZXdbXSB7IEEsIEIsIEMsIEQgfSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHhPUyA9IChpbnQpKGNvcm5lci5YICsgb2Zmc2V0LlgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHlPUyA9IChpbnQpKGNvcm5lci5ZICsgb2Zmc2V0LlkpO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmNhbnZhc1t4T1MsIHlPU10gPSAnKic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIExpbmVSZW5kZXJlci5SZW5kZXIoY2FudmFzLCBBICsgVmVjdG9yMkQuUmlnaHQsIEIgKyBWZWN0b3IyRC5MZWZ0LCBvZmZzZXQsICctJyk7XHJcbiAgICAgICAgICAgIExpbmVSZW5kZXJlci5SZW5kZXIoY2FudmFzLCBCICsgVmVjdG9yMkQuVXAsIEMgKyBWZWN0b3IyRC5Eb3duLCBvZmZzZXQsICd8Jyk7XHJcbiAgICAgICAgICAgIExpbmVSZW5kZXJlci5SZW5kZXIoY2FudmFzLCBDICsgVmVjdG9yMkQuTGVmdCwgRCArIFZlY3RvcjJELlJpZ2h0LCBvZmZzZXQsICctJyk7XHJcbiAgICAgICAgICAgIExpbmVSZW5kZXJlci5SZW5kZXIoY2FudmFzLCBEICsgVmVjdG9yMkQuRG93biwgQSArIFZlY3RvcjJELlVwLCBvZmZzZXQsICd8Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEN1YmVSZW5kZXJlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW5kZXIoQ2FudmFzIGNhbnZhcywgQ3ViZSBjdWJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVuZGVyKGNhbnZhcywgY3ViZSwgUG9pbnQuWmVybyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVuZGVyKENhbnZhcyBjYW52YXMsIEN1YmUgY3ViZSwgUG9pbnQgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEEgPSBjdWJlLkNvcm5lcnNbMF07XHJcbiAgICAgICAgICAgIHZhciBCID0gY3ViZS5Db3JuZXJzWzFdO1xyXG4gICAgICAgICAgICB2YXIgQyA9IGN1YmUuQ29ybmVyc1syXTtcclxuICAgICAgICAgICAgdmFyIEQgPSBjdWJlLkNvcm5lcnNbM107XHJcblxyXG4gICAgICAgICAgICB2YXIgQV8gPSBjdWJlLkNvcm5lcnNbNF07XHJcbiAgICAgICAgICAgIHZhciBCXyA9IGN1YmUuQ29ybmVyc1s1XTtcclxuICAgICAgICAgICAgdmFyIENfID0gY3ViZS5Db3JuZXJzWzZdO1xyXG4gICAgICAgICAgICB2YXIgRF8gPSBjdWJlLkNvcm5lcnNbN107XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVwdGhWZWN0b3IgPSBuZXcgVmVjdG9yMkQoY3ViZS5EZXB0aCk7XHJcbiAgICAgICAgICAgIHZhciB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjJEKDEpO1xyXG5cclxuICAgICAgICAgICAgUmVjdGFuZ2xlUmVuZGVyZXIuUmVuZGVyKGNhbnZhcywgQSwgQiwgQywgRCwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgUmVjdGFuZ2xlUmVuZGVyZXIuUmVuZGVyKGNhbnZhcywgQV8sIEJfLCBDXywgRF8sIG9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICBMaW5lUmVuZGVyZXIuUmVuZGVyKGNhbnZhcywgQSArIHVuaXRWZWN0b3IsIEFfIC0gdW5pdFZlY3RvciwgJ1xcXFwnKTtcclxuICAgICAgICAgICAgTGluZVJlbmRlcmVyLlJlbmRlcihjYW52YXMsIEIgKyB1bml0VmVjdG9yLCBCXyAtIHVuaXRWZWN0b3IsICdcXFxcJyk7XHJcbiAgICAgICAgICAgIExpbmVSZW5kZXJlci5SZW5kZXIoY2FudmFzLCBDICsgdW5pdFZlY3RvciwgQ18gLSB1bml0VmVjdG9yLCAnXFxcXCcpO1xyXG4gICAgICAgICAgICBMaW5lUmVuZGVyZXIuUmVuZGVyKGNhbnZhcywgRCArIHVuaXRWZWN0b3IsIERfIC0gdW5pdFZlY3RvciwgJ1xcXFwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgcmVuZGVyQ3ViZVxyXG57XHJcbiAgICBjbGFzcyBMaW5lYXJJbnRlcnBvbGF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIGRvdWJsZSBsZXJwKGRvdWJsZSBzdGFydCwgZG91YmxlIGVuZCwgZG91YmxlIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhcnQgKyB0ICogKGVuZCAtIHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBQb2ludCBsZXJwX3BvaW50KFBvaW50IHAwLCBQb2ludCBwMSwgZG91YmxlIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KGxlcnAocDAuWCwgcDEuWCwgdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVycChwMC5ZLCBwMS5ZLCB0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZG91YmxlIGRpYWdvbmFsX2Rpc3RhbmNlKFBvaW50IHAwLCBQb2ludCBwMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkeCA9IHAxLlggLSBwMC5YO1xyXG4gICAgICAgICAgICB2YXIgZHkgPSBwMS5ZIC0gcDAuWTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguTWF4KE1hdGguQWJzKGR4KSwgTWF0aC5BYnMoZHkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBQb2ludCByb3VuZF9wb2ludChQb2ludCBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludChNYXRoLlJvdW5kKHAuWCwgTWlkcG9pbnRSb3VuZGluZy5Eb3duKSwgTWF0aC5Sb3VuZChwLlksIE1pZHBvaW50Um91bmRpbmcuRG93bikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBMaXN0PFBvaW50PiBHZXRMaW5lKFBvaW50IHN0YXJ0LCBQb2ludCBlbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gbmV3IExpc3Q8UG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIHZhciBOID0gZGlhZ29uYWxfZGlzdGFuY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXAgPSAwOyBzdGVwIDw9IE47IHN0ZXArKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBOID09IDAgPyAwLjAgOiBzdGVwIC8gTjtcclxuICAgICAgICAgICAgICAgIHBvaW50cy5BZGQocm91bmRfcG9pbnQobGVycF9wb2ludChzdGFydCwgZW5kLCB0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSByZW5kZXJDdWJlXHJcbntcclxuICAgIHN0cnVjdCBWZWN0b3IyRFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgWDtcclxuICAgICAgICBwdWJsaWMgZG91YmxlIFk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChkb3VibGUgeCwgZG91YmxlIHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChkb3VibGUgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggPSB4O1xyXG4gICAgICAgICAgICBZID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgTWFnbml0dWRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguU3FydChYICogWCArIFkgKiBZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtYWcgPSBNYWduaXR1ZGU7XHJcbiAgICAgICAgICAgIFggLz0gbWFnO1xyXG4gICAgICAgICAgICBZIC89IG1hZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXhwbGljaXQgb3BlcmF0b3IgVmVjdG9yMkQoVmVjdG9yM0QgdnQzRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodnQzRC5YLCB2dDNELlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciArKFZlY3RvcjJEIGEsIFZlY3RvcjJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKGEuWCArIGIuWCwgYS5ZICsgYi5ZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIGEsIFZlY3RvcjJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKGEuWCAtIGIuWCwgYS5ZIC0gYi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVmVjdG9yMkQgVXAgPSBuZXcgVmVjdG9yMkQoMCwgMSk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBWZWN0b3IyRCBEb3duID0gbmV3IFZlY3RvcjJEKDAsIC0xKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFZlY3RvcjJEIExlZnQgPSBuZXcgVmVjdG9yMkQoLTEsIDApO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVmVjdG9yMkQgUmlnaHQgPSBuZXcgVmVjdG9yMkQoMSwgMCk7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIHJlbmRlckN1YmVcclxue1xyXG4gICAgc3RydWN0IFZlY3RvcjNEXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBYO1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgWTtcclxuICAgICAgICBwdWJsaWMgZG91YmxlIFo7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChkb3VibGUgeCwgZG91YmxlIHksIGRvdWJsZSB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHg7XHJcbiAgICAgICAgICAgIFkgPSB5O1xyXG4gICAgICAgICAgICBaID0gejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgTWFnbml0dWRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguU3FydChYICogWCArIFkgKiBZICsgWiAqIFopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1hZyA9IE1hZ25pdHVkZTtcclxuICAgICAgICAgICAgWCAvPSBtYWc7XHJcbiAgICAgICAgICAgIFkgLz0gbWFnO1xyXG4gICAgICAgICAgICBaIC89IG1hZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgVmVjdG9yM0QoVmVjdG9yMkQgdnQyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yM0QodnQyRC5YLCB2dDJELlksIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
