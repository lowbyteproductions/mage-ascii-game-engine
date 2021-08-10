import Layer from "../Layer";

/**
 * Acstract
 */
export default abstract class Renderer {
  protected namedLayers: Record<string, Layer> = {};
  protected layers: Array<Layer> = [];
  protected layerElements: Record<string, HTMLElement> = {};
  protected size: number = 30;
  protected beforeDraw: () => void = () => {};
  frames: number = 0; 

  setSize(n: number) {
    this.size = n
  }

  onBeforeDraw(cb: () => void) {
    this.beforeDraw = cb;
  }

  addLayer(name: string, layer: Layer): Renderer {
    if (name in this.namedLayers) {
      throw new Error(`${name} layer already attached to renderer`);
    }
    this.namedLayers[name] = layer;
    this.layers.push(layer);  
    this.orderLayers();
    return this;
  }
  abstract commit(): void; 

  private orderLayers() {
    this.layers = this.layers.sort((la, lb) => la.z - lb.z);
  }
}