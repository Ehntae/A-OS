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

    private static _initialised:boolean = false;
    private static _cameraEntities:Camera[] = [];

    constructor() {
         if (ViewportHandler._initialised == true)
            throw new Error("Cannot instansiate more than one instance of a singleton!");
            
<<<<<<< HEAD
            //let resolution:Vector2d = 

            //camera.setResolution();
            camera.update();
=======
        
        ViewportHandler._initialised = true;
    }

>>>>>>> origin/dev

    public update():void {
        for(let i = 0 ; i < ViewportHandler._cameraEntities.length; i++) {

            let camera:Camera = ViewportHandler._cameraEntities[i];
            
            let resolution:Vector2d = RenderHandler.getResolution();

            camera.setResolution(resolution);
        }
    }

    public static registerCamera(camera:Camera):void {
		ViewportHandler._cameraEntities.push(camera);
	}
	
	public static removeCamera(cameraId:number):void {
		
		//  Check the renderComponents array for the renderer component with the desired ID
		//      and splice the array to remove the index with that ID.
		for (let i:number = 0; i < ViewportHandler._cameraEntities.length; i++) 
			if (ViewportHandler._cameraEntities[i].getId() == cameraId)
				ViewportHandler._cameraEntities.splice(i, 1);
	}
}

export default ViewportHandler;