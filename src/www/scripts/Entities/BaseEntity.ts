
import Transform from "../Components/Transform";
import EntityHandler from "../Handlers/EntityHandler";

/*  Name:   BaseEntity
    Type:   Entity
    Auth:   Aeomi
    Desc:   The BaseEntity stores components that all entities must inherit to reduce overhead
    Data:   Component Transform transform
*/


abstract class BaseEntity {
    
    private static _total:number = 0;
    private _id:number;
    
    public transform:Transform;
    
    constructor() {
        this._id = ++BaseEntity._total;
        
        EntityHandler.registerEntity(this);
    }
    
    abstract update():void;
    
   	public getId():number {
        return this._id;
    }
}

export default BaseEntity;




