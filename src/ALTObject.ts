import { ALTCallingInterfaceFunc, ALTClassHasntMemberError, ALTClassNotFoundError, ALTDuplicateClassError, ALTRetainedObjNotFoundError } from "@/ALTError"
import * as Uuid from "uuid"
import { ALTRemoteLocator } from "./ALTRemoteLocator";

let ClassList: Array<ALTClass> = [];
let RetainedObjList: Array<ALTObject> = [];

export const gClassList = () => ClassList;
export function findClassByName(className: string) : ALTClass{
    const e = ClassList.find((ele) => { return ele.name == className });
    if(!e)
        throw new ALTClassNotFoundError(`Class ${className} not found!`);
    return e;
}
export const gRetainedObjList = () => RetainedObjList;
export function findRetainedObjList(uuid: string){
    const e = RetainedObjList.find((ele) => { return ele.uuid == uuid })
    if(!e)
        throw new ALTRetainedObjNotFoundError(`Obj ${uuid} not found!`);
    return e;
}


export function DECLARE_DYNAMIC(class_: any): void{
    if(ClassList.find((ele) => {return ele.name == CLASS(class_).name}))
        throw new ALTDuplicateClassError(`Class ${CLASS(class_).name} 已註冊！`);
    ClassList.push(new ALTClass(class_));
}

export abstract class ALTInterface
{
};
export abstract class ALTObject
{
    isRemote: boolean = false;
    uuid: string = Uuid.v4();
    isRetained: boolean = false;
    remoteLocation: ALTRemoteLocator | undefined;
    retain(): void{
        if(this.isRetained) return;
        RetainedObjList.push(this);
        this.isRetained = true;
    }
    release(): void{
        RetainedObjList.filter((ele) => {ele !== this});
    }
};

export class ALTClass
{
    name: string;
    tsClassObject: any;
    constructor(class_: any){
        this.tsClassObject = class_;
        this.name = class_.name;
    }
    construct = () => new this.tsClassObject();
};

export const CLASS = (class_: any) => new ALTClass(class_)
export const DECLARE_INTERFACE_FUNC = () => new ALTCallingInterfaceFunc("Interface is not callable!");
export const DYNAMIC_IMPLABLE_INTERFACE = (target: any) => {};

export class TypeHelper {
    static typeName(ctor: { name:string }) : string {
        return ctor.name;
    }
}

