export default class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  multiply(n: number): Vector {
    this.x *= n;
    this.y *= n; 
    return this; 
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  static add(v1:Vector, v2:Vector) {
    return v1.clone().add(v2);
  }

  static multiply(v: Vector, n: number): Vector {
    return v.clone().multiply(n); 
  }

  static Zero() {
    return new Vector(0, 0);
  }
}
