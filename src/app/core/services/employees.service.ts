import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiEmployeeByEmail, ApiEmployeeById, Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl = environment.BASE_API_URL;
  constructor(
    private http:HttpClient,
  ) { }

  getEmployeeByEmail(email:ApiEmployeeByEmail): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl+"Employee/get-employees-by-email", email);
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+"Employee/get-all-employees");
  }

  getEmployeeById(apiEnterpriseById:ApiEmployeeById): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl+"Department/get-department-by-id", apiEnterpriseById);
  }

  saveEmployee(request:Employee): Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.apiUrl+"Department/save-departments-changes", request);
  }
}
