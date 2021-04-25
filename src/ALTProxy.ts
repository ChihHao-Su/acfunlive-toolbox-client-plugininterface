import { ALTClassHasntMemberError } from "./ALTError";
import { ALTClass, ALTInterface } from "./ALTObject";
import _, { forEach } from "lodash"
import { ALTRemoteLocator } from "./ALTRemoteLocator";
import { ALTRPCActionStat, ALTRPCAction } from "./ALTRPCAction"
import * as Uuid from "uuid"


export class ALTProxy<T extends ALTInterface>{
	private constructor(remoteObjLoc: ALTRemoteLocator){
	   this.remoteObjLoc = remoteObjLoc; 
	}

	remoteObjLoc: ALTRemoteLocator;
	

	static makeProxy(altDynClass: ALTClass, remoteObjLoc: ALTRemoteLocator): ProxyConstructor{
		//TODO: 判断远程对象类型是否正确


		const altClassObj = altDynClass.construct()
		console.log(altClassObj);
		return new Proxy( altClassObj , {
			get: (target, key) => {
				console.log(key);
				console.log(`ALTProxy: Getting key ${String(key)} of ${altDynClass.name}`);
				
				if(!(key in altClassObj))
					throw new ALTClassHasntMemberError(`Class ${altDynClass.name} hasn't member called ${String(key)}!`);

				const callable = () => {};
				callable.__proxyInfo = new ALTProxy(remoteObjLoc);
				const rpcAction: ALTRPCAction = {time: new Date(), uuid: Uuid.v4(), target: remoteObjLoc, 
												funcName: String(key), argList: [], status: ALTRPCActionStat.LAUNCHED};
				callable.__rpcAction = rpcAction;

				return new Proxy(callable, {
					apply: (target, self, args) => {
						console.log(`ALTProxy: Calling: ${String(JSON.stringify(target.__rpcAction))}`);
						console.log(args);
						for(let e in args){
							console.log(e);
						}
					}
				});
			}
		});
	}
	static create<T>(altDynClass: ALTClass, remoteObjLoc: ALTRemoteLocator): T{
		return <T><unknown>(ALTProxy.makeProxy(altDynClass, remoteObjLoc));
	}
};
