import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent {

  successMessage: boolean = false;

  Add_Admin: FormGroup;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.Add_Admin = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      username: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\d@$!%*#?&]{8,}$')]),

    },
      {
        validators: this.checkPassword,
      }
    );

  }

  get fullName() {
    return this.Add_Admin.get('fullName')
  }
  get username() {
    return this.Add_Admin.get('username');
  }
  get email() {
    return this.Add_Admin.get('email');
  }
  get password() {
    return this.Add_Admin.get('password');
  }

  get confirmPassword() {
    return this.Add_Admin.get('confirmPassword');
  }

  navigateToAllAdmin() {
    this.router.navigate(['/admin/list_admin']);
  }

  checkPassword(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }




  AddAdmin() {
    if (this.Add_Admin.valid) {
      const url = 'https://localhost:7021/api/Admin/AddAdmin';

      this.httpClient.post(url, this.Add_Admin.value, { responseType: 'text' })
        .subscribe((result) => {
          this.successMessage = true;
          this.Add_Admin.reset();
        },
        );

    }

  }




}
