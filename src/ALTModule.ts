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



