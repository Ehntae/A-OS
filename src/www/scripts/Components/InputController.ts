
import IComponent from "./IComponent";

import BaseEntity from "../Entities/BaseEntity"

import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   InputController
	Type:   Component
	Auth:   Aeomi
	Desc:   The input controller is a component that is used to manipulate an entity's
			components, such as the transform component.
	Data:	
*/


abstract class InputController implements IComponent {
	
	constructor() {
		
	}
	
	// All entities that require input must implement the input method
	abstract update():void;

}

export default InputController;