export class Enterprise {
    [x: string]: any;
    Id?:number;
    CreatedBy?:string
    CreatedDate?:Date;
    ModifiedBy?:string;
    ModifiedDate?:Date;
    Status?:boolean;
    Address?:string
    Name?:string;
    Phone?:string;
}

export class ApiEnterpriseById {
    Id?:number;
}