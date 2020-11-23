import { Component } from '@angular/core';
import { Login } from '../users/user-login/user.login';
import { User } from '../users/user-registration/user';
@Component({
  templateUrl: './add.product.component.html'
})
export class AddProductComponent {
  public pageTitle = 'Add a Product';
  login = new Login();
  user : User;

  constructor(){
  this.getUserLoggedIn();
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('Users'));
  }

}
