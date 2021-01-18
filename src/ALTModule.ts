import { ALTInterface, DECLARE_INTERFACE_FUNC, DYNAMIC_IMPLABLE_INTERFACE } from "./ALTObject";

@DYNAMIC_IMPLABLE_INTERFACE
export abstract class IALTModule extends ALTInterface
{
	gName(): string{ DECLARE_INTERFACE_FUNC(); return ""; }
	onLoad(): void{ DECLARE_INTERFACE_FUNC() };
	onStartup(): void{ DECLARE_INTERFACE_FUNC() };
	onReceiveIpc(): void{ DECLARE_INTERFACE_FUNC() };
	onReceiveMsg(): void{ DECLARE_INTERFACE_FUNC() };
};

export enum ALTModuleStat
{
	REQUEST_CONNECT = 0,            // When client emited "connect" event, 
									//    and server generated uuid and send back to client with event "server_confirm_connected"
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
