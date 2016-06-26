
import BaseEntity from "./BaseEntity";

import Renderer from "../Components/Renderer";
import Transform from "../Components/Transform";
import InputController from "../Components/InputController";

import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   Ship
	Type:   Entity
	Auth:   Aeomi
	Desc:   The ship entity
	Data:   
*/

class Ship extends BaseEntity {
	
	public uniqueId:number;
	public renderer:Renderer;
	
	public constructor(uniqueId:number) {
		
		super();
		
		// Setup entity's components
		this.renderer = new Renderer(this);
		this.transform = new Transform(this, vector2d(0, 0));
		this.transform.setScale(vector2d(16, 16));
		//this.inputController = new InputController();
		
		// The uniqueID issued by the server; used to identify clients serverside
		this.uniqueId = uniqueId;
		
	}
	
	
	public update():void {
		this.transform.update();
		//this.renderer.update(); // Renderer components are taken care of by the RenderHandler
	}
	
	// Get uniqueId
	public getUniqueId() {
		return this.uniqueId;
	}
	
}

export default Ship;
