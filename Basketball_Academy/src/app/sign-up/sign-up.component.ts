import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  successMessage: boolean = false;
  failiureMessage:boolean=false;

  signup: FormGroup;



  constructor(private httpClient: HttpClient,private router: Router) {

    this.signup=new FormGroup({
      fullName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      username: new FormControl('',[Validators.required,Validators.email] ),
      email: new FormControl('',[Validators.required,Validators.email] ),
      password: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')] ),
      confirmPassword: new FormControl('',[Validators.required] ),
    },
    {
      validators: this.checkPassword,
    }
    );
   }

  
  get fullName() {
    return this.signup.get('fullName')
  }
  get username() {
    return this.signup.get('username');
  }
  get email() {
    return this.signup.get('email');
  }
  get password() {
    return this.signup.get('password');
  }
  get confirmPassword() {
    return this.signup.get('confirmPassword');
  }
  
  checkPassword(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }
  Signup() {
    if(this.signup.valid)
    {
      const url = 'https://localhost:7021/api/User/signup';

      this.httpClient.post(url,this.signup.value,{responseType:'text'})
      .subscribe((result) => { 
        console.log(result);
        if(result=='1'){
          this.successMessage = true;
          this.failiureMessage=false;
          this.signup.reset();
        }
        else if(result=='0')
        {
          this.successMessage = false;
          this.failiureMessage = true;
        }   
         
        },
      );

    }
  
   
  }


}
