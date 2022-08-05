import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiEmployeeByEmail, Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl = environment.BASE_API_URL;
  constructor(
    private http:HttpClient,
  ) { }

  getEmployeeByEamil(email:ApiEmployeeByEmail): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl+"Employee/get-employees-by-email", email);
  }
}
