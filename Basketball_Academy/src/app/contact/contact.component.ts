import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  successMessage:boolean=false;
  failureMessage:boolean=false;

  constructor(private httpClient: HttpClient) { }

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    message: new FormControl('', Validators.required)
  });

  get phone() {
    return this.contactForm.get('phone');
  }
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  sendMsg() {
    if(this.contactForm.valid)
    {
      const url=`https://localhost:7021/api/Admin/Feedback`;
      this.httpClient.post(url,this.contactForm.value,{responseType:'text'}).subscribe(
       (Response)=>
       {
         console.log(Response);
         this.successMessage=true;
         this.failureMessage=false;
         this.contactForm.reset();
       }
      )
      this.failureMessage=true;
       this.contactForm.reset();
    }
  }

}
