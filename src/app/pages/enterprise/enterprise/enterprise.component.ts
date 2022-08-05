import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ignoreElements } from 'rxjs';
import { Apiresponse } from 'src/app/core/models/apiresponse.model';
import { Employee } from 'src/app/core/models/employee.model';
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
      this.enterpriseId = valEnterpriseId !== null ? parseInt(valEnterpriseId.toString()) : 0
      if(this.enterpriseId > 0){
        this.lblTitle = 'Editar';
        this.enterpriseSrv


      }
     }

  ngOnInit(): void {
  }
  buildForm() {
    this.adminParamForm = this.fb.group({
      txt_createdBy: ['', Validators.required ],
      txt_createdDate: ['', Validators.required ],
      txt_modifiedBy: ['', Validators.required ],
      txt_modifiedDate: ['', Validators.required ],
      cbx_status: ['', Validators.required ],
      txt_address: ['', Validators.required ],
      txt_name: ['', Validators.required ],
      txt_phone: ['', Validators.required ]
    });
  }

  requestEnterprise(idEnterprise:number){
    let request = new ApiEnterpriseById;
    request.Id = idEnterprise;
    this.enterpriseSrv.getEnterpriseById(request).subscribe((CompanyesResp)=>{
      this.validateResponse(CompanyesResp);
    })
  }

  validateResponse(params:Enterprise){
    if(params.Id! > 0){
      this.fillForm(params)
    }else{
      this.toast.error('Se produjo un error al obtener la información','Error');
    }
  }

  fillForm(params:Enterprise){
      this.adminParamForm.setValue({
        txt_createdBy: params.CreatedBy,
        txt_createdDate: params.CreatedBy,
        txt_modifiedBy: params.CreatedBy,
        txt_modifiedDate: params.CreatedBy,
        cbx_status: params.Status,
        txt_name: params.Name,
        txt_address: params.Address,
        txt_phone: params.Phone,
      });
  }

  saveParam() {
    if (this.adminParamForm.valid) {
      const request = new Enterprise();
      request.Id = this.enterpriseId! > 0? this.enterpriseId : 0;
      request.CreatedBy = this.adminParamForm.value.txt_createdBy;
      request.CreatedDate = this.adminParamForm.value.txt_createdDate
      request.ModifiedBy = this.adminParamForm.value.txt_modifiedBy
      request.ModifiedBy = this.adminParamForm.value.txt_modifiedDate
      request.Status = this.adminParamForm.value.cbx_status
      request.Name = this.adminParamForm.value.txt_name
      request.Address = this.adminParamForm.value.txt_address
      request.Phone = this.adminParamForm.value.txt_phone
      
      this.enterpriseSrv.saveEnterprise(request).subscribe( response => {
        this.validateSaveParam(response)
      });
    }else{
      this.toast.warning('Asegurese que los campos esten correctos.','Alerta')
    }
  }

  validateSaveParam(params:Apiresponse){
    if(params.Success){
      this.toast.success('Se ha guardado correctamente.','Confirmación');
      this.back();
    }else{
      this.toast.error('Se produjo un error al obtener la información','Error');
    }
  }

  back() {
    this.location.back();
    sessionStorage.clear();
  }
}
