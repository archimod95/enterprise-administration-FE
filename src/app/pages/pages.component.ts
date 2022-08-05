import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  valUser?:string;

  constructor(private router:Router) {
    const valEmail = localStorage.getItem('email');
    this.valUser = valEmail !== null ? valEmail : "";
    if(this.valUser === ""){
      this.logout();
    }
   }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigateByUrl('/login');
  }
}
