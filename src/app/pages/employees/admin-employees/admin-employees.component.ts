import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeesService } from 'src/app/core/services/employees.service';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss']
})
export class AdminEmployeesComponent implements OnInit {

  //Etiquetas
  lblTitle = 'Employees';
  
  lbl_createdBy = 'Created By';
  lbl_createdDate = 'Created Date';
  lbl_modifiedBy = 'Modified By';
  lbl_modifiedDate = 'Modified Date';
  lbl_status = 'Status';
  lbl_age = 'Age';
  lbl_email = 'Email'
  lbl_name = 'Name';
  lbl_position = 'Position'
  lbl_surname = 'Surname';
  lbl_index = '#';
  lblNew= 'New';
  lbl_edit = 'Edit';
  lbl_departmentName = 'Department Name';
  //Paginación
  sizePerPage = 10;
  pageInitial = 1;
  editIcon = 'far fa-edit';

  //
  paramsList: any []=[];

 constructor(
   private router:Router,
   private employeeSrv:EmployeesService,
   private toast:ToastrService,
   private cookieSrv: CookieService,
 ) { 
   this.requestEmployee();
 }

 ngOnInit(): void {
 }

 requestEmployee(){
   this.employeeSrv.getAllEmployees().subscribe((employeeResp)=>{
     this.getAllEmployee(employeeResp);
   })
 }

 getAllEmployee(params:Employee[]){
   console.log(params);
   if(params.length != null){
     if(params.length > 0){
       this.paramsList = params;
     }else{
       this.toast.info('No aviable Info.','Information');
     }
   }else{
     this.toast.error('There was an error trying to get the Information','Error');
   }
 }

 editParam(id:number){
  console.log(id);
   sessionStorage.setItem('employeeId', id.toString());
   this.router.navigateByUrl('/dashboard/employee');
 }

 newParam(){
   this.router.navigateByUrl('/dashboard/employee');
 }

}
