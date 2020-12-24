import { ALTRPCServer } from "@/ALTRPCServer";
import * as Nodeipc from "node-ipc"
import { resolveComponent } from "vue";

let server: ALTRPCServer | null = null;

beforeAll(async () => {
    server = await ALTRPCServer.create();
});

test("Rpc server is able to react when client connect", (done) => {
    const ipc = new Nodeipc.IPC();
    const onConnect = () => {
        ipc.of["Acfunlive"].on("connect", () => {
            ipc.log("Connected to server! Waiting for response...");
        });
        ipc.of["Acfunlive"].on("serverConfirmConnected", () => {
            ipc.log("Server confirm connected!");
            ipc.disconnect("Acfunlive");
            done();
        });
    };
    
    try{
        ipc.connectToNet(
            "Acfunlive", "::1", 3378, onConnect
        )
    }catch(err){ done(err); }
});

test("Rpc server is able to react when client connect", (done) => {
    const ipc = new Nodeipc.IPC();
    const onConnect = () => {
        ipc.of["Acfunlive"].on("connect", () => {
            ipc.log("Connected to server! Waiting for response...");
        });
        ipc.of["Acfunlive"].on("serverConfirmConnected", () => {
            ipc.log("Server confirm connected!");
            ipc.disconnect("Acfunlive");
            done();
        });
    };
    
    try{
        ipc.connectToNet(
            "Acfunlive", "::1", 3378, onConnect
        )
    }catch(err){ done(err); }
});

afterAll(async (done) => {
    await server?.distory();
    done();
});