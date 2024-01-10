
import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private router:Router
  ) { }

  private isAuthenticated: boolean = false;
  private userName: string = '';
  private Id!: number;
  private email:string="";
  private role:string="";

  setUserInformation(role:string,name: string, id: number,email:string) {

    this.isAuthenticated = true;
    this.userName = name;
    this.Id = id;
    this.email=email;
    this.role=role;
    
  
    sessionStorage.setItem('userName', this.userName);
    sessionStorage.setItem('Id', this.Id.toString());
    sessionStorage.setItem('email', this.email);
  }
  canActivate(): boolean {
    if (this.isAuthenticated) {
      if (this.role === 'Admin' || this.role === 'Coach' || this.role === 'Player') {
        return true;
      } else {
        this.router.navigate(['signin']);
        return false;
      }
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    } 
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserName(): string {
    debugger;
    return this.userName;
  }

  getUserId(): number {
    return this.Id;
  }

  getEmail(): string {
    return this.email;
  }

  logout() {
    this.isAuthenticated = false;
    this.userName = '';
    this.Id;
    this.email="";
    this.router.navigate(['signin']);
    sessionStorage.clear(); 


  }
}
