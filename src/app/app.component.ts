import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'> {{pageTitle}} </a>
        <ul class='nav nav-pills'>
            <li ><a class='nav-link' [routerLink]="['/products']">Adverts</a></li>
        </ul>
        
        <ul *ngIf="loggedIn()" class='nav nav-pills'>
            <li><a class='nav-link' [routerLink]="['/products/0/edit']">Add an Advert</a></li>
        </ul>
        <ul *ngIf="!loggedIn()" class='nav nav-pills'>
        <li><a class='nav-link' [routerLink]="['/user-login']">Add an Advert</a></li>
        </ul>
     
        <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
        <ul class='nav nav-pills'>
            <li *ngIf="!loggedIn()"><a class='nav-link' [routerLink]="['/user-registration']">Register</a></li>
            <li *ngIf="!loggedIn()"><a class='nav-link' [routerLink]="['/user-login']">Login</a></li>
            <li *ngIf="loggedIn()"><a class='nav-link'> Welcome {{loggedInUser}}</a> </li>
            <li *ngIf="loggedIn()" ><a class='nav-link' [routerLink]="['/my-products']"  >My Adverts</a></li>
            <li *ngIf="loggedIn()" ><a class='nav-link' [routerLink]="['/user-login']" (click)="onLogOut()" >Log Out</a></li>
        </ul>    
        </div>
    </nav> 
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `

})

export class AppComponent{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  pageTitle: string = 'Buy and Sell';

  loggedInUser: string;

  constructor(private router: Router) {}

  loggedIn(){
    //Get User to display their email
    this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser;
  }

  onLogOut(){
    localStorage.removeItem('token');
    alert('Successfully Logged Out!')
  }

  


 
}
