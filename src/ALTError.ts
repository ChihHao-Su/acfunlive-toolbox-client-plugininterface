export class ALTClassNotFoundError extends Error
{
    constructor(msg: string){
        super(msg);
        this.name = "ALTClassNotFoundError";
    }
}

export class ALTDuplicateClassError extends Error
{
    constructor(msg: string){
        super(msg);
        this.name = "ALTDuplicateClassError";
    }
}

export class ALTClassHasntMemberError extends Error
{
    constructor(msg: string){
        super(msg);
        this.name = "ALTClassHasntMemberError";
    }
}

export class ALTCallingInterfaceFunc extends Error
{
    constructor(msg: string){
        super(msg);
        this.name = "ALTCallingInterfaceFunc";
    }
}