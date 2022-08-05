import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Enterprise } from 'src/app/core/models/enterprise.model';
import { EnterprisesService } from 'src/app/core/services/enterprises.service';

@Component({
  selector: 'app-admin-enterprise',
  templateUrl: './admin-enterprise.component.html',
  styleUrls: ['./admin-enterprise.component.scss']
})
export class AdminEnterpriseComponent implements OnInit {

   //Etiquetas
   lblTitle = 'Empresa';
  
   lbl_createdBy = 'Created By';
   lbl_createdDate = 'Created Date';
   lbl_modifiedBy = 'Modified By';
   lbl_modifiedDate = 'Modified Date';
   lbl_status = 'Status';
   lbl_address = 'Address';
   lbl_name = 'Name';
   lbl_phone = 'Phone';
   lbl_index = '#';
   lblNew= 'New';
   lbl_edit = 'Edit';
 
   //Paginación
   sizePerPage = 10;
   pageInitial = 1;
   editIcon = 'far fa-edit';
 
   //
   paramsList: any []=[];

  constructor(
    private router:Router,
    private enterpriseSrv:EnterprisesService,
    private toast:ToastrService,
    private cookieSrv: CookieService,
  ) { 
    this.requestEnterprise();
  }

  ngOnInit(): void {
  }

  requestEnterprise(){
    this.enterpriseSrv.getAllEnterprises().subscribe((rolesResp)=>{
      console.log(rolesResp);  
      this.getAllEnterprises(rolesResp);
    })
  }

  getAllEnterprises(params:Enterprise[]){
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
    sessionStorage.setItem('enterpriseId', id.toString());
    this.router.navigateByUrl('/dashboard/enterprise');
  }

  newParam(){
    this.router.navigateByUrl('/dashboard/enterprise');
  }
}
