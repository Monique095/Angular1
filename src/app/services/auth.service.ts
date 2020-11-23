import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(){}

 authUser(user : any){
     let UserArray = [];
     if(localStorage.getItem('Users')){
         UserArray = JSON.parse(localStorage.getItem('Users'));
     }

     return UserArray.find(p => p.emailGroup.email === user.email && p.passwordGroup.password === user.password );
        
 }
}