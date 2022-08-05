import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
    {title:"Enterprise", url:'enterprise-administration', icon:'fa fa fa-building'},
    {title:"Departments",url:'departments-administration', icon:'fa fa fa-address-book'},
    {title:"Employee", url:'employees-administration', icon:'fa fa fa-user'}
  ];
  username = localStorage.getItem("name") + " " + localStorage.getItem("surname");
}


