import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  
  name:string="";
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.name=this.authService.getUserName();
  }

}
