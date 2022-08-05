export class Employee {
    id?:number;
    created_By?:string
    created_Date?:Date;
    modified_By?:string;
    modified_Date?:Date;
    status?:boolean;
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
