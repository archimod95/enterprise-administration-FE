import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentsService } from 'src/app/core/services/departments.service';
@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.scss']
})
export class AdminDepartmentsComponent implements OnInit {

  //Etiquetas
  lblTitle = 'Department';
  
  lbl_createdBy = 'Created By';
  lbl_createdDate = 'Created Date';
  lbl_modifiedBy = 'Modified By';
  lbl_modifiedDate = 'Modified Date';
  lbl_status = 'Status';
  lbl_description = 'Description';
  lbl_name = 'Name';
  lbl_phone = 'Phone';
  lbl_index = '#';
  lblNew= 'New';
  lbl_edit = 'Edit';
  lbl_enterpriseName = 'Enterprise Name';
  //Paginación
  sizePerPage = 10;
  pageInitial = 1;
  editIcon = 'far fa-edit';

  //
  paramsList: any []=[];

 constructor(
   private router:Router,
   private departmentSrv:DepartmentsService,
   private toast:ToastrService,
   private cookieSrv: CookieService,
 ) { 
   this.requestEnterprise();
 }

 ngOnInit(): void {
 }

 requestEnterprise(){
   this.departmentSrv.getAllDepartments().subscribe((departmentResp)=>{
     this.getAllEnterprises(departmentResp);
   })
 }

 getAllEnterprises(params:Department[]){
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
   sessionStorage.setItem('departmentId', id.toString());
   this.router.navigateByUrl('/dashboard/departments');
 }

 newParam(){
   this.router.navigateByUrl('/dashboard/departments');
 }

}
