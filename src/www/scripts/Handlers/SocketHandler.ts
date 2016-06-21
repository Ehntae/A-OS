
import * as SocketIO from "socket.io-client";

/*  Name:   SocketHandler
    Type:   Handler
    Auth:   Aeomi
    Desc:   The SocketHandler manages the client's socket link to the serverside socket.io
    Data:   Socket socket
*/

class SocketHandler {

    private static _initialised:boolean = false;
    private _socket:SocketIOClient.Socket;

    constructor() {
        
        if (SocketHandler._initialised == true)
            throw new Error("Cannot instansiate more than one instance of a singleton!");
            
        this._socket = io();
        
        
        SocketHandler._initialised = true;
    }

    
    triggerEvent(eventName:string, data:any):void {
        console.log(this._socket.emit(eventName, data));
    }
    
    createHook(eventName:string, callback:Function) {
        console.log(this._socket.on(eventName, callback));
    }


}

export default SocketHandler;