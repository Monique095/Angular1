import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { passwordMatcher, emailMatcher } from './password-email.match';
import { removeSpaces } from './remove-spaces';
import { User } from './user';

@Component({
    templateUrl: './user.registration.component.html',
    styleUrls: ['./user.registration.component.css']
  })

export class UserRegistrationComponent implements OnInit {
  public pageTitle = 'Registration Form';
  registration = new User();
  customerForm: FormGroup;
  user: any = {};

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserServiceService ) 
    {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3), removeSpaces]],
      lastName: ['', [Validators.required, Validators.maxLength(50), removeSpaces]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), removeSpaces]],

      // Make a form bulder for the password
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3), removeSpaces]],
        confirmPassword: ['', Validators.required],
        //with the function inside
      }, {validator : passwordMatcher}),

      // Make a form bulder for the email
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email, removeSpaces]],
        confirmEmail: ['', Validators.required],
        //with the function inside
      }, {validator : emailMatcher})     
    });
  }

  //Register Button on HTML Form
  save() 
  {
    console.log(this.customerForm.value);
    this.user = Object.assign(this.user, this.customerForm.value);

    if(this.user)
    {
      this.userService.addUser(this.user);
      this.customerForm.reset();
      alert('Registration was Successfull, Please Log in.')
      this.router.navigate(['user-login']);
    }
    else 
    {
      alert('Something went wrong.')
      this.customerForm.reset();
    }   
  }

  goToLoginPage(): void
  {
    this.router.navigate(['/user-login']);
  }

  
  
}