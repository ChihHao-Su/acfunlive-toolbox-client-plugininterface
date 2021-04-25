import { IALTModule, ALTModule, IALTModuleInfo, ALTModule_type, ALTModule_friend, ALTModuleStat } from "./ALTModule";
import {ALTModuleNotFoundError} from "./ALTError"
import * as sio from "socket.io"
import { isUndefined } from "lodash";
import * as Uuid from "uuid"
import { ALTRemoteLocator } from "./ALTRemoteLocator";
import { ALTProxy } from "./ALTProxy";
import { CLASS } from "./ALTObject";

//interface 


export class ALTRPCServer
{

    public sioServer: sio.Server;
    public moduleList: Array<ALTModule> = new Array();

    public constructor(){
        this.sioServer = new sio.Server(3378);
        this.onServerCreated();
    }
    public gModuleByName(name: string): ALTModule | undefined{
        return this.moduleList.find((o: ALTModule): Boolean => {
            let moduleInfo = o.gInfo();
            return moduleInfo !== null && moduleInfo.gName() == name;
        });
    }
    public gModuleByName_strict(name: string): ALTModule{
        let res = this.gModuleByName(name);
        if(res === undefined){
            throw new ALTModuleNotFoundError(`Module name=${name} not found!`);
        }
        return res;
    }

    private onServerCreated(): void{
        console.log("Server started up!")
        this.sioServer.on("connect", (socket: sio.Socket, moduleName: string) => {
            const uuid = Uuid.v4();
            console.log(`Client requests connect! addr=${String(socket.handshake.address)}, modulename=${moduleName}, giving connection uuid ${uuid}.`);
            let module = new ALTModule_type();
            module.sStat(ALTModuleStat.REQUEST_CONNECT);
            this.moduleList.push(module);
            socket.emit("serverConfirmedConnection", uuid);
        });
        this.sioServer.on("passModuleInfo", (socket: sio.Socket, moduleInfoLoc: ALTRemoteLocator) => {
            let moduleInfo = ALTProxy.create<IALTModuleInfo>(CLASS(IALTModuleInfo), moduleInfoLoc);
            console.log(`Client passes info! uuid=${moduleInfoLoc.moduleName}`);
            let module = this.gModuleByName_strict(moduleInfoLoc.moduleName);       // Find module in modulelist
            (<ALTModule_friend>module).sInfo(moduleInfo);
            let ret: ALTRemoteLocator = {moduleUuid: "0", objectUuid: module.uuid};
            socket.emit("connectionEstablished", ret);
        });
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