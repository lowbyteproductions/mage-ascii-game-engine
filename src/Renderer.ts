import Layer from "./Layer";

export default class Renderer {
  private namedLayers: Record<string, Layer> = {};
  private layers: Array<Layer> = [];
  private layerElements: Record<string, HTMLElement> = {};
  private size: number = 30;
  private beforeDraw: () => void = () => {};

  frames:number = 0;

  setSize(n: number) {
    this.size = n;
  }

  addLayer(name: string, layer: Layer) {
    if (name in this.namedLayers) {
      return new Error(`${name} layer already attached to renderer`);
    }
    this.namedLayers[name] = layer;
    this.layers.push(layer);

    this.orderLayers();

    return this;
  }

  onBeforeDraw(cb: () => void) {
    this.beforeDraw = cb;
  }

  commit() {
    this.beforeDraw();

    for (let [name, layer] of Object.entries(this.namedLayers)) {
      let layerEl = this.layerElements[name];

      if (!layerEl) {
        layerEl = document.createElement('div');
        layerEl.classList.add('asc-engine-layer');
        layerEl.style.fontSize = `${this.size}px`;
        layerEl.style.top = `${layer.pos.y * this.size}px`;
        layerEl.style.left = `${layer.pos.x * this.size / 2}px`;
        layerEl.style.height = `${layer.size.y * this.size}px`;
        layerEl.style.width = `${layer.size.x * this.size / 2}px`;
        layerEl.style.zIndex = layer.z.toString();

        document.getElementById('asc-engine-layer-container').appendChild(layerEl);
        this.layerElements[name] = layerEl;
      }

      for (let op of layer.operations) {
        let opEl = document.getElementById(`asc-engine-tile-${op.tile.id}`);

        if (!opEl) {
          opEl = document.createElement('div');
          opEl.classList.add('asc-engine-tile');
          opEl.id = `asc-engine-tile-${op.tile.id}`;

          layerEl.appendChild(opEl);
        }

        if (op.isVisible) {
          opEl.innerHTML = op.char.replace(/ /g, '&nbsp;');
          opEl.style.color = op.color.toCssString();
          opEl.style.backgroundColor = op.background.toCssString();
          opEl.style.top = `${op.pos.y * this.size}px`;
          opEl.style.left = `${op.pos.x * this.size / 2}px`;
          opEl.style.display = 'block';
        } else {
          opEl.style.display = 'none';
        }
      }

      layer.clear();
    }

    this.frames++;
  }

  private orderLayers() {
    this.layers = this.layers.sort((la, lb) => la.z - lb.z);
  }
}
