import { IALTModule } from "./ALTindex";
import * as Nodeipc from "node-ipc"
import * as sio from "socket.io"
import { isUndefined } from "lodash";
import * as Uuid from "uuid"

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
            const uuid = Uuid.v4()
            console.log(`Client request connect! addr=${String(socket.handshake.address)}, giving uuid ${uuid}.`);
            socket.emit("serverConfirmConnected", uuid);
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