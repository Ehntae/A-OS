import * as SocketIO from "socket.io";

interface IUserSocket extends SocketIO.Socket { data:any }

export default IUserSocket;

