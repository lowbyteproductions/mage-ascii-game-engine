import Renderer from "./Renderer";
import Layer from "../Layer";
import Vector from "../Vector";

export default class CanvasRenderer extends Renderer {

    private context: CanvasRenderingContext2D; 
    private canvas: HTMLCanvasElement; 

    constructor() {
        super();
        // Additionally, create the canvas and the canvas context. 
        let container: HTMLElement = document.getElementById("asc-engine-layer-container"); 
        if (container === null) {
            throw new Error("Container Not Found: No div with id 'asc-engine-layer-container' was found. ");
        }
        let canvas: HTMLCanvasElement = document.createElement('canvas'); 
        let context: CanvasRenderingContext2D = canvas.getContext('2d'); 
        canvas.id = 'asc-engine-canvas'; 
        this.context = context; 
        this.canvas = canvas; 
        container.appendChild(canvas); 
    }

    addLayer(name: string, layer: Layer): Renderer {
        super.addLayer(name, layer);
        // Additionally, adjust the size of the canvas according to the size
        // and position of the new layer. 
        let maxSize = Vector.add(layer.pos, layer.size); 
        if (maxSize.x * this.size > this.canvas.width) {
            this.canvas.width = maxSize.x * this.size / 2; 
        }
        if (maxSize.y * this.size > this.canvas.height) {
            this.canvas.height = maxSize.y * this.size; 
        }
        return this; 
    }

    commit(): void {
        this.beforeDraw(); 
        for (let layer of this.layers) {
            
            for (let op of layer.operations) {
                if (!op.isVisible) {
                    continue; 
                }
                let pixelPos = new Vector(op.pos.x * this.size / 2, op.pos.y * this.size); 
                this.context.fillStyle = op.background.toCssString(); 
                this.context.fillRect(pixelPos.x, pixelPos.y, this.size, this.size); 

                this.context.fillStyle = op.color.toCssString(); 
                this.context.font = `${this.size}px 'Inconsolata', Courier, monospace`; 
                this.context.fillText(op.char, pixelPos.x, pixelPos.y); 
            }
            layer.clear(); 
        }
        this.frames ++; 
        
    }
}

class CanvasUtils {

}