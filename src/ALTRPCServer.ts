import { IALTModule } from "./ALTindex";
import * as Nodeipc from "node-ipc"
import * as sio from "socket.io"
import { isUndefined } from "lodash";

//interface 

export class ALTRPCServer
{

    public sioServer: sio.Server;

    public constructor(){
        this.sioServer = new sio.Server(3378);
        this.onServerCreated();
    }
    private onServerCreated(): void{
        console.log("Server started up!")
        this.sioServer.on("connection", (socket: sio.Socket, ) => {
            console.log(`Client connected! socket=${String(socket)}`);
            socket.emit("serverConfirmConnected");
            
            
        })
    }


    distory(): Promise<void>{
        return new Promise( (resolve, reject) => {
            this.sioServer.close((err: Error | undefined) => {
                if(err !== undefined){
                    reject(err);
                }else{
                    setTimeout(() => { resolve(); }, 1000);
                }
            })
        });
    }
};