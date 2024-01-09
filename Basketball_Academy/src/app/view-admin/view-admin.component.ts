import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class Admin {
  constructor(
    public id: number,
    public fullName: string,
    public username: string,
    public email: string
  ) {}
}

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {
  admins: Admin[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  navigateToAddAdmin() {
    this.router.navigate(['/admin/add_admin']);
  }

  deleteAdmin(id: number) {
    this.httpClient.delete(`https://localhost:7021/api/Admin/DeleteAdmin/`+id,{responseType:'text'}).subscribe(
      () => {
        this.router.navigate(['/admin/list_admin']);
        this.getAdmins(); 
      },
    );
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.httpClient.get<Admin[]>('https://localhost:7021/api/Admin/ViewAdmin').subscribe(
      (response: Admin[]) => {
        console.log(response);
        this.admins = response;
      },
    );
  }
}
