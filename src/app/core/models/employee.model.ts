export class Employee {
    id?:number;
    createdBy?:string
    createdDate?:Date;
    modifiedBy?:string;
    modifiedDate?:Date;
    atatus?:boolean;
    age?:string;
    email?:string;
    name?:string;
    position?:string;
    surname?:string;
}

export class ApiEmployeeByEmail {
    Email?:string;
}

export class ApiEmployeeById{
    Id?:number;
}
