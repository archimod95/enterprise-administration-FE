import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiEmployeeByEmail } from '../models/employee.model';
import { Observable } from 'rxjs';
import { ApiEnterpriseById, Enterprise } from '../models/enterprise.model';
import { Apiresponse } from '../models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  private apiUrl = environment.BASE_API_URL;
  constructor(
    private http:HttpClient,
  ) { }

  getAllEnterprises(): Observable<Enterprise[]>{
    return this.http.get<Enterprise[]>(this.apiUrl+"Enterprise/get-all-enterprises");
  }

  getEnterpriseById(apiEnterpriseById:ApiEnterpriseById): Observable<Enterprise>{
    return this.http.post<Enterprise>(this.apiUrl+"Enterprise/get-enterprise-by-id", apiEnterpriseById);
  }

  saveEnterprise(request:Enterprise): Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.apiUrl+"Enterprise/save-enterprise-changes", request);
  }
}
