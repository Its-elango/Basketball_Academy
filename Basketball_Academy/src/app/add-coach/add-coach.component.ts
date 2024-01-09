import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.scss'
})
export class AddCoachComponent {

addCoach: FormGroup;

  failiureMessage:boolean=false;
  successMessage:boolean=false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,  
  ) {
    this.addCoach=new FormGroup({
      FullName:new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      username:new FormControl('',[Validators.required,Validators.email]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')]),
      confirmPassword:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')]),
    },
    
      {
        validators: this.checkPassword,
      }
  );

  }

  get FullName() {
    return this.addCoach.get('FullName')
  }
  get username() {
    return this.addCoach.get('username');
  }
  get email() {
    return this.addCoach.get('email');
  }
  get password() {
    return this.addCoach.get('password');
  }

  get confirmPassword() {
    return this.addCoach.get('confirmPassword');
  }

  navigateToAllCoach()
  {
    this.router.navigate(['/admin/list_coach']);
  }

  checkPassword(control:AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  AddCoach(){
const url='https://localhost:7021/api/Coach/AddCoach';

this.httpClient.post(url,this.addCoach.value,{responseType:'text'})
.subscribe((result)=>{
  if(result==="ok"){
    console.log(result);
    this.successMessage = true;
    this.failiureMessage=false;
    this.addCoach.reset();
  }
  else if(result==="error")
  {
    this.failiureMessage = true;
  }
}
)
  }

}
