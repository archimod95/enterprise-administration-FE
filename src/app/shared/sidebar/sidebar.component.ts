import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({
  providedIn:"root"
})
export class SidebarComponent implements OnInit {

  menuItems?:any[];
  username?:string;
  constructor(private sideBarService: SidebarService, private router:Router) {
    this.menuItems = this.sideBarService.menu;
    this.username = this.sideBarService.username;
    console.log(this.menuItems)
   }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigateByUrl('/login');
  }

}
