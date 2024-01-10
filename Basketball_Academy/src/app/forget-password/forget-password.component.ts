import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  hide = true;
  
  successMessage: boolean = false;
  changepwd: FormGroup;

 

  constructor(private httpClient: HttpClient,private router: Router) {
    this.changepwd=new FormGroup({
      Username: new FormControl('',[Validators.required,Validators.email]),
      Email: new FormControl('',[Validators.required,Validators.email] ),
      Password: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')] ),
      confirmPassword: new FormControl('',[Validators.required] ),
    },
    {
      validators: this.checkPassword.bind(this),
    });
   }

  get Username()
  {
    return this.changepwd.get('Username');
  }

  get Email()
  {
    return this.changepwd.get('Email');
  }

  get Password()
  {
    return this.changepwd.get('Password');
  }

  
  checkPassword(control: AbstractControl) {
    return control.get('Password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }
 

  ChangePwd() {
    if(this.changepwd.valid){
      
      const url = 'https://localhost:7021/api/Credential/ChangePassword';
 
     this.httpClient.post(url,this.changepwd.value,{responseType:'text'})
     .subscribe((result) => { 
         this.successMessage = true;
         this.changepwd.reset();
       },
     );

    }
   
    
    
   }

}
