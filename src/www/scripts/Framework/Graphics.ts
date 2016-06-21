
class Graphics {
    
    private _context:CanvasRenderingContext2D;
    
    constructor(context:CanvasRenderingContext2D) {
        this.setContext(context);
    }
    
    setContext(context:CanvasRenderingContext2D) {
        this._context = context;
    }
    
    getContext():CanvasRenderingContext2D {
        return this._context;
    }
    
    setColor(r:number, g:number, b:number):void {
        this.getContext().fillStyle = "rgb("+r+","+g+","+b+")";
        this.getContext().strokeStyle = "rgb("+r+","+g+","+b+")";
    }

    pixel(x:number, y:number):void {
        this.getContext().fillRect(x, y, 1, 1);
    }


    // Primitive shapes
    rect(x:number, y:number, w:number, h:number):void {
        this.getContext().fillRect(x, y, w, h)
    }
    
    
    line(x1:number, y1:number, x2:number, y2:number):void {
        this.getContext().moveTo(x1, y1);
        this.getContext().lineTo(x2, y2);
        this.getContext().stroke();
    }


    circle(x:number, y:number, r:number):void {
        this.getContext().beginPath();
        this.getContext().arc(x, y, r, 0, 2 * Math.PI);
        this.getContext().stroke();
    }


    // Text
    setFont(fontName:string, fontSize:number):void {
        this.getContext().font = fontSize + "px " + fontName;
    }


    text(x:number, y:number, text:string):void {
        this.getContext().fillText(text, x, y);
    }


    texture(texture:HTMLImageElement, x:number, y:number, w:number, h:number):void {
        this.getContext().drawImage(texture, x, y, w, h);
    }


    textureSliced(texture:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number):void {
        this.getContext().drawImage(texture, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    
}

export default Graphics;