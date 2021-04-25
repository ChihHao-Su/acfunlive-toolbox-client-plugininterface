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
	ClassList.push(CLASS(class_));
}
export function DYNAMIC_IMPLABLE_INTERFACE(class_: any): void{
	if(ClassList.find((ele) => {return ele.name == CLASS(class_).name}))
		throw new ALTDuplicateClassError(`Class ${CLASS(class_).name} 已註冊！`);
	ClassList.push(ITFC(class_));
}
export function REMOTE_OVERRIDE(target: any, key: string, desc: PropertyDescriptor) { };
export function TYPEDEF(class_: any) { };

export abstract class ALTInterface
{
	gUuid(): string{ throw DECLARE_INTERFACE_FUNC(); }
	
};
export abstract class ALTObject extends ALTInterface
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
	gUuid(): string{
		return this.uuid;
	}
};

export class ALTClass
{
	name: string;
	tsClassObject: any;
	isInterface: boolean;
	constructor(class_: any, isInterface: boolean = false){
		this.tsClassObject = class_;
		this.name = class_.name;
		this.isInterface = isInterface;
	}
	construct = () => new this.tsClassObject();
};

export const CLASS = (class_: any) => new ALTClass(class_)
export const ITFC = (class_: any) => new ALTClass(class_, true)
export const DECLARE_INTERFACE_FUNC = () => new ALTCallingInterfaceFunc("Interface is not callable!");

export class TypeHelper {
	static typeName(ctor: { name:string }) : string {
		return ctor.name;
	}
}

