export class Department {
    Id?:number;
    CreatedBy?:string
    CreatedDate?:Date;
    ModifiedBy?:string;
    ModifiedDate?:Date;
    Status?:boolean;
    Description?:string
    Name?:string;
    Phone?:string;
    IdEnterprise?:string;
}

export class ApiDepartmentById {
    Id?:number;
}
