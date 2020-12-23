import * as SocketIO from "socket.io";
import { Container } from "typedi";
import { Server as httpServer } from "http";
import {
    SocketAuthentication,
    RemoveSocketId,
    RemoveSocketIdFromUserSockets,
    GetUserIdBySocketId,
    GetSocketIdsByUserId,
} from "./SocketAutentication";
import { SocketEvents } from "./SocketConstants";

export default class SocketLoader {
    private static _io: SocketIO.Server;

    static async Load(server: httpServer) {
        this._io = SocketIO.default(server);
        this._init();
        console.log("***************SOCKET IO CONNECTED***************");
    }

    private static _init() {
        this._io.use(SocketAuthentication);
        this._io.on(SocketEvents.CONNECT, (socket) => {
            socket.on(SocketEvents.DISCONNECT, async () => {
                const userId = GetUserIdBySocketId(socket.id);
                await RemoveSocketId(socket.id);
                await RemoveSocketIdFromUserSockets(socket.id, userId);
            });
           
            
        });
    }
}
