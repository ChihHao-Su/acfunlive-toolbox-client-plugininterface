import { DECLARE_INTERFACE_FUNC } from "./ALTindex";
import { ALTInterface } from "./ALTindex";
import { ENABLE_REMOTE } from "./ALTObject";

@ENABLE_REMOTE
export abstract class IALTModule extends ALTInterface
{
    gName(): string{ DECLARE_INTERFACE_FUNC(); return ""; }
    onLoad(): void{ DECLARE_INTERFACE_FUNC() };
    onStartup(): void{ DECLARE_INTERFACE_FUNC() };
    onReceiveIpc(): void{ DECLARE_INTERFACE_FUNC() };
    onReceiveMsg(): void{ DECLARE_INTERFACE_FUNC() };
};



