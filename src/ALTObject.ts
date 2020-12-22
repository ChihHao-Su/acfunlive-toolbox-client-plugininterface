import { ALTCallingInterfaceFunc, ALTClassHasntMemberError, ALTClassNotFoundError, ALTDuplicateClassError } from "@/ALTError"

let ClassList: Array<ALTClass> = [];

export const gClassList = () => ClassList;
export function findClassByName(className: string) : ALTClass{
    const e = ClassList.find((ele) => {return ele.name == className});
    if(!e)
        throw new ALTClassNotFoundError(`Class ${className} not found!`);
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

export class TypeHelper {

    static typeName(ctor: { name:string }) : string {
        return ctor.name;
    }
}

export class ALTProxy<T extends ALTInterface>{
    constructor(altClass: ALTClass){
        const altClassObj = altClass.construct()
        console.log(altClassObj);
        return new Proxy( altClassObj , {
            get: (target, key) => {
                console.log(`ALTProxy: Getting key ${String(key)} of ${altClass.name}`);
                
                if(!(key in altClassObj))
                    throw new ALTClassHasntMemberError(`Class ${altClass.name} hasn't member called ${String(key)}!`);
                if(String(key) == "testvar")
                    return "test";

                if(String(key) == "testfunc")
                    return () => "test";
            }
        });
    }
};
