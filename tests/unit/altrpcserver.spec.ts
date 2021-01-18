import { ALTRPCServer } from "@/ALTRPCServer";
import * as Nodeipc from "node-ipc"
import * as sio from "socket.io-client"
import { resolveComponent } from "vue";

let server: ALTRPCServer | null = null;

beforeAll(async () => {
    server = new ALTRPCServer();
});

test("Rpc server is able to react when client connect", (done) => {
    const ipc = new Nodeipc.IPC();
    console.log("Connecting to server...");
    const sioCli =  sio.io("http://localhost:3378");

    sioCli.on("serverConfirmConnected", (uuid: string) => {
        console.log(`Server confirmed connected! uuid=${uuid}`);
        expect(uuid).toContain("-");
        done();
    });
});

/*test("Rpc server is able to react when client connect", (done) => {
    const ipc = new Nodeipc.IPC();
    console.log("Connecting to server...");
    const sioCli =  sio.io("http://localhost:3378");

    sioCli.on("serverConfirmConnected", () => {
        console.log("Server confirmed connected!")
        done();
    });
});*/

afterAll(async (done) => {
    await server?.distory();
    done();
});