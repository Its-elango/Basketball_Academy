import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  failureMessage: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthServiceService
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')]),
  });

  get Username(){
    return this.loginForm.get('username');
  }
  get Password(){
    return this.loginForm.get('password');
  }


  login() {
  
    const url = 'https://localhost:7021/api/Credential/signin';
    this.httpClient.post(url, this.loginForm.value, { responseType: 'json' }).subscribe(
      (response: any) => {
        this.handleSuccessfulLogin(response.role, response.name, response.id,response.email);
      },
    );
  }
  
  private handleSuccessfulLogin(role: string, name: string, id: number,email:string) {
    this.authService.setUserInformation(role, name, id,email);

    if (role === "Admin") {
      this.router.navigateByUrl('/admin/home');
    } else if (role === "Coach") {  
      this.router.navigateByUrl('/coach/home');
    } else if (role === "Player") {
      this.router.navigateByUrl('/player/home');
    } else if(role === "Unknown") {
      this.failureMessage = true;
    }

  }
}
