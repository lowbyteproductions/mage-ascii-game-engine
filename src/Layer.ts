import Color from "./Color";
import Tile from "./Tile";
import Vector from "./Vector";

interface DrawingOperation {
  tile: Tile;
  char: string;
  color: Color;
  background: Color;
  pos: Vector;
  isVisible: boolean;
};

const drawingOperation = (tile: Tile): DrawingOperation => ({
  tile,
  char: tile.char,
  color: tile.color.clone(),
  background: tile.background.clone(),
  pos: tile.pos.clone(),
  isVisible: tile.isVisible
});

interface LayerConstructorOptions {
  opacity?: number;
  isVisible?: boolean;
  pos?: Vector;
  size: Vector;
  z?: number;
};

export default class Layer {
  opacity: number;
  isVisible: boolean;
  pos: Vector;
  size: Vector;
  operations: Array<DrawingOperation> = [];
  private _z: number;

  constructor(options: LayerConstructorOptions) {
    this.opacity = options.opacity || 1;
    this.isVisible = options.isVisible || true;
    this.pos = options.pos || Vector.Zero();
    this.size = options.size;

    this._z = options.z || 0;
  }

  get z() { return this._z; }

  draw(tile: Tile) {
    this.operations.push(drawingOperation(tile));
  }

  clear() {
    this.operations = [];
  }
}
