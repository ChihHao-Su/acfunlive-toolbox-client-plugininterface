import { ALTClassHasntMemberError } from "./ALTError";
import { ALTClass, ALTInterface } from "./ALTObject";

export class ALTProxy<T extends ALTInterface>{
    constructor(altDynClass: ALTClass){
        const altClassObj = altDynClass.construct()
        console.log(altClassObj);
        return new Proxy( altClassObj , {
            get: (target, key) => {
                console.log(key);
                console.log(`ALTProxy: Getting key ${String(key)} of ${altDynClass.name}`);
                
                if(!(key in altClassObj))
                    throw new ALTClassHasntMemberError(`Class ${altDynClass.name} hasn't member called ${String(key)}!`);
                if(String(key) == "testvar")
                    return "test";
                if(String(key) == "testfunc")
                    return () => "test";

                return new Proxy({}, {
                    apply: (target, self, args) => {

                    }
                });
            }
        });
    }
    static create<T>(altDynClass: ALTClass): T{
        return <T>(new ALTProxy(altDynClass));
    }
};
