
interface IVector2d {
    x:number,
    y:number
}


export class Vector2d implements IVector2d {
    
    public x:number;
    public y:number;
    
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    
    // Use on deltavectors only
    
    length():number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    public normalize() {
        let length:number = this.length();
        this.x /= length;
        this.y /= length;
    }
    
}


export function vector2d(x:number, y:number):Vector2d {
    
    let vec2d:Vector2d = new Vector2d(x, y);
    
    return vec2d;
    
}