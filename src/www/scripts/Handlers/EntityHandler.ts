
import BaseEntity from "../Entities/BaseEntity";

/*  Name:   EntityHandler
	Type:   Handler
	Auth:   Aeomi
	Desc:   
	Data:  
           
*/

class EntityHandler {

	private static _initialised = false;
    
    private static _entities:BaseEntity[] = [];


	constructor() {
		if (EntityHandler._initialised == true)
			throw new Error("Cannot instansiate more than one instance of a singleton!");
            
		EntityHandler._initialised = true;
}
	
		
	update() {
		for (let i = 0; i < EntityHandler._entities.length; i++) {
			let entity = EntityHandler._entities[i];
			entity.update();	
		}
	}
	
	
	static getEntities():BaseEntity[] {
		return EntityHandler._entities;
	}
	

    static registerEntity(entity:BaseEntity):void {
		EntityHandler._entities.push(entity);
	}
	
	
	static removeEntity(entityId:number):void {
		
		//  Check the entities array for the entity with the desired ID
		//      and splice the array to remove the index with that ID.
		for (let i:number = 0; i < EntityHandler._entities.length; i++) 
			if (EntityHandler._entities[i].getId() == entityId)
				EntityHandler._entities.splice(i, 1);
	}
	
    
}

export default EntityHandler;




