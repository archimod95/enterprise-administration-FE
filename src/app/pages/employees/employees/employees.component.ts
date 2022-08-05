import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Apiresponse } from 'src/app/core/models/apiresponse.model';
import { Location } from '@angular/common';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ApiEmployeeById, Employee } from 'src/app/core/models/employee.model';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeeId?: number; // param storage
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
  lbl_age = 'Age';
  lbl_email = 'Email'
  lbl_name = 'Name';
  lbl_position = 'Position'
  lbl_surname = 'Surname';

  //Form
  adminParamForm!:FormGroup
  constructor(   
    private employeeSrv:EmployeesService,
    private toast:ToastrService,
    private fb:FormBuilder,
    private location: Location
    ) {
      this.buildForm();
      const valemployeeId = sessionStorage.getItem('employeeId');
      this.employeeId = valemployeeId !== null ? parseInt(valemployeeId.toString()) : 0;
      const valEmail = localStorage.getItem('email');
      this.modified_By = valEmail !== null ? valEmail : "";
      if(this.employeeId > 0){
        this.lblTitle = 'Edit';
        this.requestEmployee(this.employeeId);
      }else{
        this.created_By =  valEmail !== null ? valEmail : "";
      }
     }

  ngOnInit(): void {
  }
  buildForm() {
    this.adminParamForm = this.fb.group({
      txt_createdBy: [''],
      txt_createdDate: [''],
      txt_modifiedBy: [''],
      txt_modifiedDate: [''],
      cbx_status: [true, Validators.required ],
      txt_age: ['', Validators.required ],
      txt_email: ['', Validators.required ],
      txt_name: ['', Validators.required ],
      txt_position: ['', Validators.required ],
      txt_surname: ['', Validators.required]
    });
  }

  requestEmployee(idEnterprise:number){
    let request = new ApiEmployeeById;
    request.Id = idEnterprise;
    this.employeeSrv.getEmployeeById(request).subscribe((employeeResp)=>{
      this.validateResponse(employeeResp);
    })
  }

  validateResponse(params:Employee){
    if(params.id! > 0){
      this.created_By = params.created_By!;
      this.created_Date = params.created_Date!;
      this.modified_By = params.modified_By!;
      this.modified_Date = params.modified_Date!;
      this.fillForm(params);
    }else{
      this.toast.error('There was an error trying to get the information','Error');
    }
  }

  fillForm(params:Employee){
      this.adminParamForm.setValue({
        txt_createdBy: params.created_By,
        txt_createdDate: params.created_Date,
        txt_modifiedBy: params.modified_By,
        txt_modifiedDate: params.modified_Date,
        cbx_status: params.status,
        txt_age: params.age,
        txt_email: params.email,
        txt_name: params.name,
        txt_position: params.position,
        txt_surname: params.surname
      });
  }

  saveParam() {
    console.log(this.created_By);
    if (this.adminParamForm.valid) {
      console.log("si llega hasta aqui");
      const request = new Employee();
      request.id = this.employeeId! > 0? this.employeeId : 0;
      request.created_By = this.employeeId! > 0? this.adminParamForm.value.txt_createdBy : this.created_By;
      request.created_Date = this.employeeId! > 0? this.adminParamForm.value.txt_createdDate : new Date();
      request.modified_By =this.modified_By;
      request.modified_Date = new Date();
      request.status = this.adminParamForm.value.cbx_status;
      request.age = this.adminParamForm.value.txt_age;
      request.email = this.adminParamForm.value.txt_email;
      request.name = this.adminParamForm.value.txt_name;
      request.position = this.adminParamForm.value.txt_position;
      request.surname = this.adminParamForm.value.txt_surname;
      this.employeeSrv.saveEmployee(request).subscribe( response => {
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
