import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { ApiDepartmentById, Department } from 'src/app/core/models/department.model';
import { Apiresponse } from 'src/app/core/models/apiresponse.model';
import { Enterprise } from 'src/app/core/models/enterprise.model';
import { EnterprisesService } from 'src/app/core/services/enterprises.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departmentId?: number; // param storage
  created_By?:string;
  created_Date?:Date;
  modified_Date?:Date;
  modified_By?:string;
  
  //Etiquetas
  lblTitle = 'New';
  lblSave = 'Save';
  lblBackTo = 'Back';
  lbl_param = 'Parameter';
  lbl_obligatory = 'Required Data';
  lblError='Something happen';
  lbl_createdBy='Created By';
  lbl_createdDate = 'Created Date';
  lbl_modifiedBy = 'Modified By';
  lbl_modifiedDate = 'Modified Date';
  lbl_status = 'Status';
  lbl_description = 'Description';
  lbl_name = 'Name';
  lbl_phone = 'Phone';

  //Form
  adminDepartmentForm!:FormGroup
  constructor(   
    private departmentSrv:DepartmentsService,
    private toast:ToastrService,
    private fb:FormBuilder,
    private location: Location
    ) {
      this.buildForm();
      const valEnterpriseId = sessionStorage.getItem('departmentId');
      this.departmentId = valEnterpriseId !== null ? parseInt(valEnterpriseId.toString()) : 0;
      const valEmail = localStorage.getItem('email');
      this.modified_By = valEmail !== null ? valEmail : "";
      if(this.departmentId > 0){
        this.lblTitle = 'Edit';
        this.requestDepartment(this.departmentId);
      }else{
        this.created_By =  valEmail !== null ? valEmail : "";
      }
     }

  ngOnInit(): void {
  }
  buildForm() {
    this.adminDepartmentForm = this.fb.group({
      txt_createdBy: [''],
      txt_createdDate: [''],
      txt_modifiedBy: [''],
      txt_modifiedDate: [''],
      cbx_status: [true, Validators.required ],
      txt_description: ['', Validators.required ],
      txt_name: ['', Validators.required ],
      txt_phone: ['', Validators.required ]
    });
  }

  requestDepartment(idEnterprise:number){
    let request = new ApiDepartmentById;
    request.Id = idEnterprise;
    this.departmentSrv.getDepartmentById(request).subscribe((departmentResp)=>{
      console.log(departmentResp);
      this.validateResponse(departmentResp);
    })
  }

  validateResponse(params:Department){
    if(params.id! > 0){
      this.created_By = params.created_By!;
      this.created_Date = params.created_Date!;
      this.modified_By = params.modified_By!;
      this.modified_Date = params.modified_Date!;
      this.fillForm(params);
    }else{
      this.toast.error('Se produjo un error al obtener la información','Error');
    }
  }

  fillForm(params:Department){
    console.log(params);
      this.adminDepartmentForm.setValue({
        txt_createdBy: params.created_By!,
        txt_createdDate: params.created_Date,
        txt_modifiedBy: params.modified_By,
        txt_modifiedDate: params.modified_Date,
        txt_description: params.description,
        txt_name: params.name,
        txt_phone: params.phone,
        cbx_status: params.status,
      });
  }

  saveParam() {
    console.log(this.created_By);
    if (this.adminDepartmentForm.valid) {
      const request = new Department();
      request.id = this.departmentId! > 0? this.departmentId : 0;
      request.created_By = this.departmentId! > 0? this.adminDepartmentForm.value.txt_createdBy : this.created_By;
      request.created_Date = this.departmentId! > 0? this.adminDepartmentForm.value.txt_createdDate : new Date();
      request.modified_By =this.modified_By;
      request.modified_Date = new Date();
      request.name = this.adminDepartmentForm.value.txt_name;
      request.description = this.adminDepartmentForm.value.txt_description;
      request.phone = this.adminDepartmentForm.value.txt_phone;
      request.status = this.adminDepartmentForm.value.cbx_status;
      this.departmentSrv.saveDepartment(request).subscribe( response => {
        this.validateSaveParam(response)
      });
    }else{
      this.toast.warning('Check every field has the correct information','Alert')
    }
  }

  validateSaveParam(params:Apiresponse){
    console.log(params.success!);
    if(params.success){
      this.toast.success('The record has been saved succesfully.','Confirmation');
      this.back();
    }else{
      this.toast.error('There was an error getting tryng to get the Information','Error');
    }
  }

  back() {
    this.location.back();
    sessionStorage.clear();
  }

}
