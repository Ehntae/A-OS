
import IComponent from "./IComponent";

import BaseEntity from "../Entities/BaseEntity";

import RenderHandler from "../Handlers/RenderHandler";

/*  Name:   Renderer
	Type:   Component
	Auth:   Aeomi
	Desc:   The Renderer component holds data required for rendering a given entity.
			Component constructors must be passed "this" by the entities that initialise him.
	Data:   (BaseEntity) parentEntity
			BoundingBox shape
			RGB color?
			Texture texture
*/

class Renderer implements IComponent {
	
	private static total = 0;
	private _id:number;
	
	private _parentEntity:BaseEntity;
	private _texture:HTMLImageElement;
	
	constructor(parentEntity:BaseEntity) {
		
		this._parentEntity = parentEntity;
		
		// Assign an identification number according to the total created
		this._id = ++Renderer.total;
		
		RenderHandler.registerRenderer(this);
	}
	
	
	update():void {}
	
	
	// Load and internally cache a texture for rendering
	public setTexture(path:string) {
		this._texture = new Image();
		this._texture.src = path;
	}
	
	
	getTexture() {
		return this._texture;
	}
	
	
	getId() {
		return this._id;
	}
	
	
	getParentEntity():BaseEntity {
		return this._parentEntity;
	}
	
}

export default Renderer;