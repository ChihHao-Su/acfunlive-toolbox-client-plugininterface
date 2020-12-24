import { ALTRemoteLocator } from "./ALTRemoteLocator";

enum ALTRPCActionStatus
{
	LAUNCHED = 0,		// When rpc is launched by application
	SCHEDULE,			// When rpc request is transported to middle-end, 
						//    and middle-end is scheduling delivering rpc to target.
	DELIVERD,			// When rpc request is transported to TCP proxy client of target application, 
						//    and proxy client is analysing rpc request to call target object.
	EXEC,				// When target object is called, target function is executing.
	RETURN,				// When rpc calling finished, and target application is transporting the return value
						//    to middle-end.
	RET_SCHEDULE,		// When return value is transported to middle-end,
						//    and middle-end is scheduling delivering the return value.
	RET_DELIVERD,		// When return value is transported to source application,
						//    and source application is resolving the promise that launched the rpc.
	DONE				// The promise launched the rpc is resolved.
};

interface ALTRPCAction
{
	time: Date;
	uuid: string;
	target: ALTRemoteLocator;
	funcName: string;
	argList: Array<any>;
	status: ALTRPCActionStatus;
};