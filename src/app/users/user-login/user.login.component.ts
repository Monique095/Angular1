
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from './user.login';

@Component({
    templateUrl: './user.login.component.html'
})

export class UserLoginComponent implements OnInit {

  login = new Login();
  pageTitle = 'Login Form';


  constructor(private router: Router,
              private authService: AuthService ) { }
        
    ngOnInit(): void {
   
    }
   
    save(signupForm: NgForm) 
    {     
      console.log(signupForm.value);
      const token = this.authService.authUser(signupForm.value);

      if(token)
      {
        localStorage.setItem('token', token.emailGroup.email)
        alert('Login Successful')
        this.router.navigate(['/add-products'])
      }
      else 
      {
        alert('Email or Password is incorrect')
        signupForm.reset();
      }
    }

    
    goToRegistrationPage(): void
    {
      this.router.navigate(['/user-registration']);
    }


}

  