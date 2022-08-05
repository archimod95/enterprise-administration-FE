export class Enterprise {
    id?:number;
    created_By?:string
    created_Date?:Date;
    modified_By?:string;
    modified_Date?:Date;
    status?:boolean;
    address?:string
    name?:string;
    phone?:string;
}

export class ApiEnterpriseById {
    Id?:number;
}