import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiresponse } from '../models/apiresponse.model';
import { ApiDepartmentById, Department } from '../models/department.model';
import { Enterprise } from '../models/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private apiUrl = environment.BASE_API_URL;
  
  constructor(
    private http:HttpClient,
  ) { }

  getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.apiUrl+"Department/get-all-departments");
  }

  getDepartmentById(apiEnterpriseById:ApiDepartmentById): Observable<Department>{
    return this.http.post<Department>(this.apiUrl+"Department/get-department-by-id", apiEnterpriseById);
  }

  saveDepartment(request:Enterprise): Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.apiUrl+"Department/save-departments-changes", request);
  }

}
