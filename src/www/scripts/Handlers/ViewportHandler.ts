import RenderHandler from "./RenderHandler";

import Camera from "../Entities/Camera";

import {Vector2d, vector2d} from "../Framework/utility";

/*  Name:   Camera  
    Type:   Handler
    Auth:   Koopa & Aeomi
    Desc:   Updates Camera Entities and provides them with the resolution
    Data:   private _cameraEntities:Camera[]

*/

class ViewportHandler {

    private _cameraEntities:Camera[];

    constructor() {

    }

    public update():void {
        for(let i = 0 ; i < this._cameraEntities.length; i++) {
            let camera:Camera = this._cameraEntities[i];
            
            //let resolution:Vector2d = 

            //camera.setResolution();
            camera.update();



        }
    }
}