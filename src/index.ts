import Color from "./Color";
import Layer from "./Layer";
import Renderer from "./Renderer/Renderer";
import DOMRenderer from "./Renderer/DOMRenderer";
import Tile from "./Tile";
import Vector from "./Vector";
import CanvasRenderer from "./Renderer/CanvasRenderer";

const WIDTH = 80;
const HEIGHT = 24;

const layers: Record<string, Layer> = {
  background: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  actor: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
};

const player = new Tile({
  background: new Color(0,0,0,0),
  char: '@',
  color: new Color(255, 0, 0),
  isVisible: true,
  pos: new Vector(10, 10)
});

const backgroundTiles = Array.from({ length: WIDTH*HEIGHT }, (_, i) => {
  const x = i % WIDTH;1
  const y = Math.floor(i / WIDTH);

  return new Tile({
    char: '.',
    pos: new Vector(x, y)
  });
});


let renderer: Renderer; 
const domRenderer: Renderer = new DOMRenderer(); 
const canvasRenderer: Renderer = new CanvasRenderer(); 
const beforeDraw = () => {
  layers.background.operations.forEach(op => {
    const newAlpha = (Math.sin((renderer.frames / 10) + (op.pos.x / op.pos.y)) + 1) / 2;
    op.color.a = newAlpha;
  })}; 

domRenderer.setSize(35);
domRenderer.addLayer('background', layers.background);
domRenderer.addLayer('actor', layers.actor);
domRenderer.onBeforeDraw(beforeDraw); 

canvasRenderer.setSize(35);
canvasRenderer.addLayer('background', layers.background);
canvasRenderer.addLayer('actor', layers.actor);
canvasRenderer.onBeforeDraw(beforeDraw); 


renderer = domRenderer; 

let fps = 0;
setInterval(() => {
  document.getElementById('asc-engine-fps').textContent = fps.toString(); 
  fps = 0; 
}, 1000); 

const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  layers.actor.draw(player);
  renderer.commit();
  fps ++; 
  requestAnimationFrame(draw);
}

draw();
let ascEngineCanvas: HTMLElement = document.getElementById('asc-engine-canvas'); 
let ascEngineRendererSelect: HTMLElement = document.getElementById('asc-engine-renderer-name'); 
ascEngineRendererSelect.addEventListener('click', _ => {
  if (renderer instanceof DOMRenderer) {
    ascEngineCanvas.style.display = 'block'; 
    ascEngineRendererSelect.textContent = 'Canvas Renderer'; 
    renderer = canvasRenderer; 
  }
  else {
    ascEngineCanvas.style.display = 'none'; 
    ascEngineRendererSelect.textContent = 'DOM Renderer'; 
    renderer = domRenderer; 
  }
})

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': {
      player.pos.add(new Vector(0, -1));
      break;
    }
    case 'ArrowDown': {
      player.pos.add(new Vector(0, 1));
      break;
    }
    case 'ArrowLeft': {
      player.pos.add(new Vector(-1, 0));
      break;
    }
    case 'ArrowRight': {
      player.pos.add(new Vector(1, 0));
      break;
    }
  }
})