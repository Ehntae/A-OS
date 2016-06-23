
import BaseEntity from "../Entities/BaseEntity";

import Renderer from "../Components/Renderer";

import Graphics from "../Framework/Graphics";
import {vector2d, Vector2d} from "../Framework/utility"

/*  Name:   RenderHandler
	Type:   Handler
	Auth:   Aeomi
	Desc:   The render handler handles the rendering of renderer components to the HTML5 Canvas
	Data:   renderComponents TODO <-this
*/

const enum RESOLUTION_TYPE {
	FIXED,
	DYNAMIC
}



class RenderHandler {

	private static _initialised = false;
	
	private static _renderComponents:Renderer[] = [];
	
	// Graphical
	private _canvas:HTMLCanvasElement;
	private _graphics:Graphics;
	
	// Resolution
	private _resolutionType:RESOLUTION_TYPE;
	private static _resolutionWidth:number;
	private static _resolutionHeight:number;

	// Framerate
	private _frameRate:number;
	private _lastFrameTime:number;
	
	
	constructor() {
		if (RenderHandler._initialised == true)
			throw new Error("Cannot instansiate more than one instance of a singleton!");
		
		this._setupCanvas();
		
		RenderHandler._initialised = true;
	}
	
	
	private _setupCanvas():void {
		this._canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
		let container = <HTMLDivElement>document.getElementById("game-container");
		
		let context = this._canvas.getContext("2d");
		this._graphics = new Graphics(context);
		
		this._canvas.width  = RenderHandler._resolutionWidth;
		this._canvas.height = RenderHandler._resolutionHeight;
		
	}
	
	
	public update():void {
		
		// Update the canvas resolution
		RenderHandler._resolutionWidth = window.innerWidth  - 48;
		RenderHandler._resolutionHeight = window.innerHeight - 16;

		//Apply resolution to canvas height and width
		this._canvas.width = RenderHandler._resolutionWidth;
		this._canvas.height = RenderHandler._resolutionHeight;
		
		// Clear canvas and blit new coloured background
		this._graphics.setColor(76, 144, 228);
		this._graphics.rect(0, 0, this._canvas.width, this._canvas.height);
		
		//TODO: Create FPS counter and draw it here
		
		
		// Gather renderable data from all entities that own a renderer component
		for (let i = 0; i < RenderHandler._renderComponents.length; i++) {
			
			let renderer = RenderHandler._renderComponents[i];
			let parentEntity = renderer.getParentEntity();
			
			let pos = parentEntity.transform.getPosition();
			let scale = parentEntity.transform.getScale();
			//-------------//

			// Rotation
			let ctx:CanvasRenderingContext2D = this._graphics.getContext();
			ctx.save();
			
			// Rotate canvas at the center of the renderComponent
			ctx.translate(pos.x + (scale.x / 2), pos.y + (scale.y / 2));
			ctx.rotate((parentEntity.transform.getFacingAngle() + 90)* (Math.PI / 180));

			this._graphics.setColor(150, 70, 0);
			this._graphics.texture(
				renderer.getTexture(), 
				-scale.x / 2, -scale.y / 2,
				scale.x, scale.y
			);
			
			ctx.restore();
		}
		
	}
	
	
	public getCanvas():HTMLCanvasElement {
		return this._canvas;
	}
	

	public static getResolution():Vector2d {
		return vector2d(RenderHandler._resolutionWidth, RenderHandler._resolutionHeight);
	}	

	
	public static registerRenderer(renderer:Renderer):void {
		RenderHandler._renderComponents.push(renderer);
	}
	
	public static removeRenderer(rendererId:number):void {
		
		//  Check the renderComponents array for the renderer component with the desired ID
		//      and splice the array to remove the index with that ID.
		for (let i:number = 0; i < RenderHandler._renderComponents.length; i++) 
			if (RenderHandler._renderComponents[i].getId() == rendererId)
				RenderHandler._renderComponents.splice(i, 1);
	}
	
}

export default RenderHandler;