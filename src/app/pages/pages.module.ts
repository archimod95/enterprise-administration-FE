import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterpriseComponent } from './enterprise/enterprise/enterprise.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEnterpriseComponent } from './enterprise/admin-enterprise/admin-enterprise.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    DashboardComponent,
    EnterpriseComponent,
    DepartmentsComponent,
    EmployeesComponent,
    PagesComponent,
    AdminEnterpriseComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    DashboardComponent,
    EnterpriseComponent,
    DepartmentsComponent,
    EmployeesComponent,
    PagesComponent
  ]
})
export class PagesModule { }
