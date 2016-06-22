
import ViewportHandler from "../Handlers/ViewportHandler";

import BaseEntity from "./BaseEntity";

import Transform from "../Components/Transform";
import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   Camera  
    Type:   Entity
    Auth:   Koopa & Aeomi
    Desc:   Provides a viewport for the client based on a target entity.
    Data:   private BaseEntity _targetEntity
            private Transform  _transform
            private Vector2d resoulution
*/

class Camera extends BaseEntity {

    private _targetEntity:BaseEntity;
    private _transform:Transform;

    constructor(targetEntity:BaseEntity) {
        
        super();
        
        // Setup entity's components
        this.setTargetEntity(targetEntity);

        let targetPos:Vector2d = targetEntity.transform.getPosition();
        
        this._transform = new Transform(this, targetPos, vector2d(0, 0));
        ViewportHandler.registerCamera(this);
    } 
    
    
    public update():void {
        this._transform.setPosition(this._targetEntity.transform.getPosition());
    }
    
    // getters and setters c;

    public getTargetEntity():BaseEntity {
        return this._targetEntity;
    }

    public setTargetEntity(targetEntity:BaseEntity):void {
        this._targetEntity = targetEntity;
    }

    public setResolution(resolution:Vector2d):void {
        this._transform.setScale(resolution);
    }


    
    

}

export default Camera;