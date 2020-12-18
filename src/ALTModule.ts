export abstract class IALTModule
{
    abstract onLoad(): void;
    abstract onStartup(): void;
    abstract onReceiveIpc(): void;
    abstract onReceiveMsg(): void;
};