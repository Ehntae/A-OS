
import EntityHandler from "./EntityHandler";

import Player from "../Entities/Player"

import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   InputHandler
	Type:   Handler
	Auth:   Aeomi
	Desc:   
	Data:   private Vector2d _cursorPos
            private HTMLCanvasElement* _canvas
*/


class InputHandler {

	private static _initialised = false;
	
    private _cursorPos:Vector2d;
    private _canvas:HTMLCanvasElement;
    
    private _mouseEvent:MouseEvent;
    private _keydownEvent:KeyboardEvent;
    private _keyupEvent:KeyboardEvent;
    
    
    //TODO: Remove these hard-typed lists from the class eventually
    private _keycodes:any = {
        "w": 87,
        "a": 65,
        "s": 83,
        "d": 68,
        "shift": 16
    }
    
    private _keyStates:any = {
        87: false,
        65: false,
        83: false,
        68: false,
        16: false
    }
	
    
	constructor(canvas:HTMLCanvasElement) {
		if (InputHandler._initialised == true)
			throw new Error("Cannot instansiate more than one instance of a singleton!");
			
        this._canvas = canvas;
        
        new Player(-1);
        
        this._setupCursorListener();
        this._setupKeyboardListener();
        
		InputHandler._initialised = true;
	}
	
    
	public update():void {
        
        // Manage player input
        let entities = EntityHandler.getEntities();
        let player = entities[1];
        let cursor = entities[0];
        
        let cursorX = ((this._cursorPos == undefined) ? 0 : this._cursorPos.x);
        let cursorY = ((this._cursorPos == undefined) ? 0 : this._cursorPos.y);
        cursor.transform.setPosition(vector2d(cursorX, cursorY));
        
        
        let transform = player.transform;
        
        // Get angle to mouse (In degrees)
        let angleToMouse:number = Math.atan2(
            cursorY - (transform.getPositionY() + (transform.getScale().y / 2)),
            cursorX - (transform.getPositionX() + (transform.getScale().x / 2))
        ) * 180 / Math.PI;
        
        
        transform.setFacingAngle(angleToMouse); // debug remove
        
        if (this._keyStates[this._keycodes.w] == true) {
            let pos:Vector2d = transform.getPosition();
            let dest:Vector2d = vector2d(cursorX, cursorY);
            
            let dx:number = dest.x - pos.x;
            let dy:number = dest.y - pos.y;
            let dpos:Vector2d = vector2d(dx, dy);
            dpos.normalize();
            
            transform.setPosition(vector2d(pos.x + dpos.x * 2, pos.y + dpos.y * 2));
        }
          
            
        if (this._keyStates[this._keycodes.s] == true) {
            let pos:Vector2d = transform.getPosition();
            let dest:Vector2d = vector2d(cursorX, cursorY);
            
            let dx:number = pos.x - dest.x;
            let dy:number = pos.y - dest.y;
            let dpos:Vector2d = vector2d(dx, dy);
            dpos.normalize();
            
            transform.setPosition(vector2d(pos.x + dpos.x, pos.y + dpos.y));
        }
            
    }
    
    
	public getCursorPos():Vector2d {
        return this._cursorPos;
    }
    
    
    private _handleKeyDowns(event:KeyboardEvent):void {
        let keydown:number = event.keyCode;
        
        this._keyStates[keydown] = true;
        
    }
    
    
    private _handleKeyUps(event:any):void {
        let keyup:number = event.keyCode;
        
        this._keyStates[keyup] = false;
    }
    
    
    private _applyCursorQueueToPosition():void {
        let canvasPosition:Vector2d = vector2d(
            this._canvas.offsetLeft,
            this._canvas.offsetTop
        );
        
        this._cursorPos = vector2d(
            this._mouseEvent.pageX - canvasPosition.x,
            this._mouseEvent.pageY - canvasPosition.y
        );
    }
    
    
    private _setupKeyboardListener():void {
        let instance:InputHandler = this;
        
        this._canvas.addEventListener("keydown", function(evnt) {
            instance._handleKeyDowns(evnt);
        }, false);
        
        
        this._canvas.addEventListener("keyup", function(evnt) {
            instance._handleKeyUps(evnt);
        }, false);
    }
    
    
    private _setupCursorListener():void {
        let instance:InputHandler = this;
        
        this._canvas.addEventListener('mousemove', function(evnt) {
            instance._mouseEvent = evnt;
            instance._applyCursorQueueToPosition();
        }, false);
        
    }
    
    
}

export default InputHandler;




