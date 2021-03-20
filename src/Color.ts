export default class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;
  private cssString: string;

  constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;

    this.makeCssString();
  }

  get r() { return this._r; }
  get g() { return this._g; }
  get b() { return this._b; }
  get a() { return this._a; }
  set r(value:number) { this._r = value; this.makeCssString(); }
  set g(value:number) { this._g = value; this.makeCssString(); }
  set b(value:number) { this._b = value; this.makeCssString(); }
  set a(value:number) { this._a = value; this.makeCssString(); }

  private makeCssString() {
    this.cssString = `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;

  }

  toCssString() {
    return this.cssString;
  }

  clone() {
    return new Color(this._r, this._g, this._b, this._a);
  }
};

