import { AbstractControl } from '@angular/forms';

//Email match with confirm Email
export function emailMatcher(c: AbstractControl): { [key: string] : boolean } | null {
    const emailControl = c.get('email');
    const emailConfirmControl = c.get('confirmEmail');
  
    if ( emailControl.pristine || emailConfirmControl.pristine ){
      return null;
    }
  
    if ( emailControl.value === emailConfirmControl.value ){
      return null;
    }
    
    return { 'match': true};
  }

  //Password match with Confirm Password
export function passwordMatcher(c: AbstractControl): { [key: string] : boolean } | null {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmPassword');
  
    if ( passwordControl.pristine || confirmControl.pristine ){
      return null;
    }
  
    if ( passwordControl.value === confirmControl.value ){
      return null;
    }
    
    return { 'match': true};
  }