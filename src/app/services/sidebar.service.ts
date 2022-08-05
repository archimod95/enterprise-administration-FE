import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[{
    title:"Dashboard",
    icon:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {title:"Enterprise", url:'enterprise-administration', icon:'fa fa fa-group'},
      {title:"Departments",url:'departments', icon:'fa fa fa-building'},
      {title:"Employee", url:'employee', icon:'fa fa fa-user'}
    ]
  }];
  username = localStorage.getItem("name") + " " + localStorage.getItem("surname");
}


