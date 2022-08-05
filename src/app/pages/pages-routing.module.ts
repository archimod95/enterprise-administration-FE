import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterpriseComponent } from './enterprise/enterprise/enterprise.component';
import { DepartmentsComponent } from './departments/departments/departments.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminEnterpriseComponent } from './enterprise/admin-enterprise/admin-enterprise.component';
import { AdminDepartmentsComponent } from './departments/admin-departments/admin-departments.component';
import { AdminEmployeesComponent } from './employees/admin-employees/admin-employees.component';

const routes:Routes = [
  {path:'dashboard', component:PagesComponent,
  children:[
    {path:'',component:DashboardComponent, data:{title:'Dashboard'}},
    {path:'enterprise', component:EnterpriseComponent, data:{title:'Enterprise'}},
    {path:'departments', component:DepartmentsComponent, data:{title:'Departments'}},
    {path:'employee', component:EmployeesComponent, data:{title:'Employee'}},
    {path:'enterprise-administration', component:AdminEnterpriseComponent, data:{title:'Employee Administration'}},
    {path:'departments-administration', component:AdminDepartmentsComponent, data:{title:'Employee'}},
    {path:'employees-administration', component:AdminEmployeesComponent, data:{title:'Employee'}}
  ]
  }
  
]

@NgModule({
  //declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
