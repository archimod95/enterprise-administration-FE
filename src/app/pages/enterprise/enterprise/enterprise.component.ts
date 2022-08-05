import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Apiresponse } from 'src/app/core/models/apiresponse.model';
import { ApiEnterpriseById, Enterprise } from 'src/app/core/models/enterprise.model';
import { EnterprisesService } from 'src/app/core/services/enterprises.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  enterpriseId?: number; // param storage
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
  lbl_address = 'Address';
  lbl_name = 'Name';
  lbl_phone = 'Phone';

  //Form
  adminParamForm!:FormGroup
  constructor(   
    private enterpriseSrv:EnterprisesService,
    private toast:ToastrService,
    private fb:FormBuilder,
    private location: Location
    ) {
      this.buildForm();
      const valEnterpriseId = sessionStorage.getItem('enterpriseId');
      this.enterpriseId = valEnterpriseId !== null ? parseInt(valEnterpriseId.toString()) : 0;
      const valEmail = localStorage.getItem('email');
      this.modified_By = valEmail !== null ? valEmail : "";
      if(this.enterpriseId > 0){
        this.lblTitle = 'Edit';
        this.requestEnterprise(this.enterpriseId);
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
      txt_address: ['', Validators.required ],
      txt_name: ['', Validators.required ],
      txt_phone: ['', Validators.required ]
    });
  }

  requestEnterprise(idEnterprise:number){
    let request = new ApiEnterpriseById;
    request.Id = idEnterprise;
    this.enterpriseSrv.getEnterpriseById(request).subscribe((EnterprisesResp)=>{
      this.validateResponse(EnterprisesResp);
    })
  }

  validateResponse(params:Enterprise){
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

  fillForm(params:Enterprise){
      this.adminParamForm.setValue({
        txt_createdBy: params.created_By,
        txt_createdDate: params.created_Date,
        txt_modifiedBy: params.modified_By,
        txt_modifiedDate: params.modified_Date,
        cbx_status: params.status,
        txt_name: params.name,
        txt_address: params.address,
        txt_phone: params.phone,
      });
  }

  saveParam() {
    console.log(this.created_By);
    if (this.adminParamForm.valid) {
      console.log("si llega hasta aqui");
      const request = new Enterprise();
      request.id = this.enterpriseId! > 0? this.enterpriseId : 0;
      request.created_By = this.enterpriseId! > 0? this.adminParamForm.value.txt_createdBy : this.created_By;
      request.created_Date = this.enterpriseId! > 0? this.adminParamForm.value.txt_createdDate : new Date();
      request.modified_By =this.modified_By;
      request.modified_Date = new Date();
      request.name = this.adminParamForm.value.txt_name;
      request.address = this.adminParamForm.value.txt_address;
      request.phone = this.adminParamForm.value.txt_phone;
      request.status = this.adminParamForm.value.cbx_status;
      this.enterpriseSrv.saveEnterprise(request).subscribe( response => {
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
