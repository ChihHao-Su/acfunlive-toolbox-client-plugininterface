import { ALTInterface, ALTObject, REMOTE_OVERRIDE, DECLARE_DYNAMIC, DECLARE_INTERFACE_FUNC, DYNAMIC_IMPLABLE_INTERFACE, TYPEDEF } from "./ALTObject";

/* ==== 远程调用接口 ==== */
@DYNAMIC_IMPLABLE_INTERFACE
export abstract class IALTModuleInfo extends ALTInterface
{
	gName(): string{ throw DECLARE_INTERFACE_FUNC(); }
	onLoad(): void{ throw DECLARE_INTERFACE_FUNC(); }
	onStartup(): void{ throw DECLARE_INTERFACE_FUNC(); }
	onReceiveIpc(): void{ throw DECLARE_INTERFACE_FUNC(); }
	onReceiveMsg(): void{ throw DECLARE_INTERFACE_FUNC(); }
};

@DYNAMIC_IMPLABLE_INTERFACE
export abstract class IALTModule extends ALTInterface
{
	gStat(): ALTModuleStat{ throw DECLARE_INTERFACE_FUNC(); }
	gConnectionUuid(): string{ throw DECLARE_INTERFACE_FUNC(); }
	gInfo(): IALTModuleInfo | null{ throw DECLARE_INTERFACE_FUNC(); }
};


/* ====== 本地 ====== */
@DECLARE_DYNAMIC
export abstract class ALTModule extends ALTObject implements IALTModule
{
	protected stat: ALTModuleStat = ALTModuleStat.IDLE;
	protected connectionUuid: string = "";
	protected info: IALTModuleInfo | null = null;

	@REMOTE_OVERRIDE
	public gStat(): ALTModuleStat{
		return this.stat;
	}
	@REMOTE_OVERRIDE
	public gConnectionUuid(): string{
		return this.connectionUuid;
	}
	@REMOTE_OVERRIDE
	public gInfo(): IALTModuleInfo | null{
		return this.info;
	}
};

export class ALTModule_friend extends ALTModule
{
	public sStat(newStat: ALTModuleStat){
		this.stat = newStat;
	}
	public sInfo(info: IALTModuleInfo){
		this.info = info;
	}
	public sModuleUuid(uuid: string){
		this.uuid = uuid;
	}
};

@TYPEDEF
export class ALTModule_type extends ALTModule_friend{};



export enum ALTModuleStat
{
	REQUEST_CONNECT = 0,            // When client emited "connect" event, 
									//    and server generated uuid and sended back to client with event "server_confirm_connected"
	CONFIRM_CONNECTION,				// When client received "server_confirm_connected" event,
									//    and responsed to server with event "clientConfirmConnected"
	PASS_MODULE_OBJ,				// When client pass module object with event "pass_module_obj",
									//    and server received that.
	CONFIRM_REGISTRATION,			// When server finished registration and feedback to client with event "server_confirm_registration"
	TEST_RPC,						// When server called "onLoad" by rpc
	CONFIRM_RPC,					// When client recived "onLoad" rpc, and emited "load_rpc_finished"
	IDLE,							// When all operation are finished and nothing to do currently.
	WAIT_FOR_HEARTBEAT,				// When server emited "heart_beat" event,
									//    and wait client to response.
	DEAD							// When client didn't response heart beat for too many times,
									//    and server GIVEUP heart beat it.

}
