
import InputHandler from "../Handlers/InputHandler";
import SocketHandler from "../Handlers/SocketHandler";
import RenderHandler from "../Handlers/RenderHandler";
import EntityHandler from "../Handlers/EntityHandler";
import ViewportHandler from "../Handlers/ViewportHandler";

import Camera from "../Entities/Camera";
import Player from "../Entities/Player";

import {vector2d, Vector2d} from "./utility";


class Program {
    
    private static _instansiated:boolean = false;
    
    public socketHandler:SocketHandler;
    public inputHandler:InputHandler;
    public renderHandler:RenderHandler;
    public entityHandler:EntityHandler;
    public viewportHandler:ViewportHandler;
    
    constructor() {
        // Handle multiple instansiation
        if (Program._instansiated == true)
            throw new Error("Cannot instansiate more than one instance of a singleton!");
        
        Program._instansiated = true;
    }
    
    
    public setupHandlers():void {
        this.viewportHandler = new ViewportHandler();
        this.entityHandler   = new EntityHandler();
        this.renderHandler   = new RenderHandler();
        this.inputHandler    = new InputHandler(this.renderHandler.getCanvas());
        this.socketHandler   = new SocketHandler();
    }
    
    // Initialising code
    public init():void {
        
        this.setupHandlers();
        
        let player:Player = new Player(-1);
        let camera:Camera = new Camera(player);
        
        player.transform.setScale(vector2d(16, 48));
        //player.renderer.setTexture("");
        
    }
    
    
    public run():void {
        let tickrate:number = 1000 / 30; //TODO: make a config
        
        let instance:any = this;
        let cb = (function() { instance.update() }); //TODO: Improve this / make modular
        
        setInterval(cb, tickrate);
    }
    
    
    public update():void {
        
        /*  Update handlers - Maintain approperiate order:
                Input: Poll and update the client's inputs
                Socket: Update all communications between client and server
                    - Sends newly updated inputs to the server
                    - Correction: Socket.io is all realtime, unlike AJAX calls where ^ would be correct.
                Entity: Update all the entities and their corresponding components
                    - Update an entity, after input and server communication is performed
                Render: Render all effective updates 
        */
        
		this.inputHandler.update();
        this.entityHandler.update(); // this needs dt
		this.viewportHandler.update();
        this.renderHandler.update();
        //this.socketHandler.update();
        
    }
    
}


export default Program;