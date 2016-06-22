
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


	public constructor() {
		if (EntityHandler._initialised == true)
			throw new Error("Cannot instansiate more than one instance of a singleton!");
            
		EntityHandler._initialised = true;
}
	
		
	public update():void {
		for (let i = 0; i < EntityHandler._entities.length; i++) {
			let entity = EntityHandler._entities[i];
			entity.update();	
		}
	}
	
	
	public static getEntities():BaseEntity[] {
		return EntityHandler._entities;
	}
	

	public static registerEntity(entity:BaseEntity):void {
		EntityHandler._entities.push(entity);
	}
	
	
	public static removeEntity(entityId:number):void {
		
		//  Check the entities array for the entity with the desired ID
		//      and splice the array to remove the index with that ID.
		for (let i:number = 0; i < EntityHandler._entities.length; i++) 
			if (EntityHandler._entities[i].getId() == entityId)
				EntityHandler._entities.splice(i, 1);
	}
	
    
}

export default EntityHandler;




