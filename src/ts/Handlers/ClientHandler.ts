import Player from "../Entities/Player";

/*  Name:   ClientHandler
	Type:   Handler
	Auth:   Aeomi
	Desc:   The Client handler provides helper functions and a singleton to manage connected clients.
	Data:   private static boolean _instansiated
            private Player[] _players
*/


class ClientHandler {

    private static _instansiated:boolean = false;
    private _players:Player[];


    constructor() {
        // Handle multiple instansiation
        if (ClientHandler._instansiated == true) 
            throw new Error("Cannot create more than one instance of a singleton!");

            this._players = [];
            
        ClientHandler._instansiated = true;
    }


    public setPlayers(newPlayersArray:Player[]):void {
        this._players = newPlayersArray;
    }

    public getPlayers():Player[] {
        return this._players;
    }


    // Add player to connected players array
    public registerPlayer(player:Player):void {
        this._players.push(player);
    }


    // Remove player from connected players array
    //@param number uId
    //@returns boolean success
    public removePlayer(uId:number):boolean {
        
        for (let i:number = 0; i < this._players.length; i++) {
            let player = this._players[i];

            if (player.uId == uId) {                            // Skip this index 
                let playersCopy = this._players.slice(0);       // Copy players array
                playersCopy.splice(i, 1);                       // Remove the correct index for the disconnecting player (start: i | distance: 1 element)

                this.setPlayers(playersCopy);                   // Set the players array to the copy with the removed player
                
                return true;
            }
        }
        
        return false;
    }


}

export default ClientHandler;