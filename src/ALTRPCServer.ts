import { IALTModule } from "./ALTindex";
import * as Nodeipc from "node-ipc"

//interface 

export class ALTRPCServer
{
    private constructor(){
		
    }
    private onServerCreated(): void{
        console.log("Server started up!")
        Nodeipc.server.on("connect", (socket) => {
            Nodeipc.log(`Client connected! socket=${socket}`);
        });
    }

    static create(): Promise<ALTRPCServer>{
        return new Promise( (resolve, reject) => {
            const inst = new ALTRPCServer();
            Nodeipc.serveNet(
			    "::1", 3378,
			    () => {
                    inst.onServerCreated();
                    resolve(inst);
			    }
            );
            try{
                Nodeipc.server.start();
            }catch(err){
                reject();
            }
        });
    }

    distory(){
        Nodeipc.server.stop();
    }
};