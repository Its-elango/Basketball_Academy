import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export class User {
  constructor(
    public id: number,
    public fullName: string,
    public username: string,
    public email: string
  ) {}
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
users:User[]=[];
constructor(private httpClient: HttpClient, private router: Router) {}


  deleteUser(id: number) {
    this.httpClient.delete(`https://localhost:7021/api/User/DeleteUser/`+id,{responseType:'text'}).subscribe(
      () => {
        this.router.navigate(['/admin/list_user']);
        this.getUsers(); 
      },
    );
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.httpClient.get<User[]>('https://localhost:7021/api/User/ViewAllUser').subscribe(
      (response: User[]) => {
        console.log(response);
        this.users = response;
      },
    );
  }
}



