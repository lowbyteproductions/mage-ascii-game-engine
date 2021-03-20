import Color from "./Color";
import Layer from "./Layer";
import Renderer from "./Renderer";
import Tile from "./Tile";
import Vector from "./Vector";

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
  pos: Vector.Zero()
});

const backgroundTiles = Array.from({ length: WIDTH*HEIGHT }, (_, i) => {
  const x = i % WIDTH;1
  const y = Math.floor(i / WIDTH);

  return new Tile({
    char: '.',
    pos: new Vector(x, y)
  });
});

const renderer = new Renderer();
renderer.setSize(35);
renderer.addLayer('background', layers.background);
renderer.addLayer('actor', layers.actor);


renderer.onBeforeDraw(() => {
  layers.background.operations.forEach(op => {
    const newAlpha = (Math.sin(op.pos.x / op.pos.y + 5) + 1) / 2;
    op.color.a = newAlpha;
  })
})


const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  layers.actor.draw(player);
  renderer.commit();

  requestAnimationFrame(draw);
}

draw();

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