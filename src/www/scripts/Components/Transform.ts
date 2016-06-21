
import IComponent from "./IComponent";

import BaseEntity from "../Entities/BaseEntity";

import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   Transform
    Type:   Component
    Auth:   Aeomi
    Desc:   The Transform component holds all transformational data.
            Component constructors must be passed "this" by the entities that initialise him.
    Data:   Angle facingDirection
            vector2d scale
            vector2d position
            vector2d velocity
*/


class Transform implements IComponent {
    
    private _parentEntity:BaseEntity
    private _facingAngle:number;
    private _position:Vector2d;
    private _velocity:Vector2d;
    private _scale:Vector2d;
    
    // Must be created with a pre-determined positiion and scale
    constructor(parentEntity:BaseEntity, position:Vector2d, scale:Vector2d) {
        
        this._parentEntity = parentEntity;
        
        this._facingAngle = 0;
        
        this._scale = scale
        
        this._position = position;
        this._velocity = vector2d(0, 0);
        
    }
    
    
    update():void {
        // Apply velocity to position
        this._position.x += this._velocity.x;
        this._position.y += this._velocity.y;
    }
    
    
    // Get-Set FacingAngle
    getFacingAngle():number {
        return this._facingAngle;
    }
    
    setFacingAngle(angle:number):void {
        this._facingAngle = angle;
    }
    
    
    // Get-Set Scale
    getScale():Vector2d {
        return this._scale;
    }
    
    setScale(scale:Vector2d):void {
        this._scale = scale;
    }
        
    
    // Get-Set Position
    getPosition():Vector2d {
        return this._position;
    }
    
    setPosition(position:Vector2d):void {
        this._position = position;
    }
    
    setPositionX(x:number):void {
        this._position.x = x;
    }
    
    setPositionY(y:number):void {
        this._position.y = y;
    }
    
    getPositionX():number {
        return this._position.x;
    }
    
    getPositionY():number {
        return this._position.y;
    }
    
    // Get-Set Velocity
    getVelocity():Vector2d {
        return this._velocity;
    }
    
    setVelocity(velocity:Vector2d):void {
        this._velocity = velocity;
    }
    
}

export default Transform;