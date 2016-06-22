
class Graphics {
    
    private _context:CanvasRenderingContext2D;
    
    public constructor(context:CanvasRenderingContext2D) {
        this.setContext(context);
    }
    
    public setContext(context:CanvasRenderingContext2D) {
        this._context = context;
    }
    
    public getContext():CanvasRenderingContext2D {
        return this._context;
    }
    
    public setColor(r:number, g:number, b:number):void {
        this.getContext().fillStyle = "rgb("+r+","+g+","+b+")";
        this.getContext().strokeStyle = "rgb("+r+","+g+","+b+")";
    }

    public pixel(x:number, y:number):void {
        this.getContext().fillRect(x, y, 1, 1);
    }


    // Primitive shapes
    public rect(x:number, y:number, w:number, h:number):void {
        this.getContext().fillRect(x, y, w, h)
    }
    
    
    public line(x1:number, y1:number, x2:number, y2:number):void {
        this.getContext().moveTo(x1, y1);
        this.getContext().lineTo(x2, y2);
        this.getContext().stroke();
    }


    public circle(x:number, y:number, r:number):void {
        this.getContext().beginPath();
        this.getContext().arc(x, y, r, 0, 2 * Math.PI);
        this.getContext().stroke();
    }


    // Text
    public setFont(fontName:string, fontSize:number):void {
        this.getContext().font = fontSize + "px " + fontName;
    }


    public text(text:string, x:number, y:number):void {
        this.getContext().fillText(text, x, y);
    }


    public texture(texture:HTMLImageElement, x:number, y:number, w:number, h:number):void {
        this.getContext().drawImage(texture, x, y, w, h);
    }


    public textureSliced(texture:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number):void {
        this.getContext().drawImage(texture, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    
}

export default Graphics;