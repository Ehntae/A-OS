
import BaseEntity from "./BaseEntity";

import Renderer from "../Components/Renderer";
import Transform from "../Components/Transform";

import {vector2d, Vector2d} from "../Framework/utility";

/*  Name:   Player
    Type:   Entity
    Auth:   Aeomi
    Desc:   The Player entity represents the client and holds data that corresponds to it via its components. 
            It represents what the client controls; its "player" in game.
    Data:   ^Component Transform transform
            Component Renderer renderer
            int uniqueID
*/

class Player extends BaseEntity {

    public uniqueId:number;
    public renderer:Renderer;

    constructor(uniqueId:number) {
        
        super();
        
        // Setup entity's components
        this.renderer = new Renderer(this);
        this.transform = new Transform(this, vector2d(0, 0));
        this.transform.setScale(vector2d(8, 8));
        // The uniqueID issued by the server; used to identify clients serverside
        this.uniqueId = uniqueId;

    }
    
    
    update():void {
        this.transform.update();
        //this.renderer.update(); // Renderer components are taken care of by the RenderHandler
    }
    
    // Get uniqueId
    getUniqueId() {
        return this.uniqueId;
    }
    

}

export default Player;