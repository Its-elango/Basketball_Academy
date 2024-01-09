import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrl: './coach-home.component.scss'
})
export class CoachHomeComponent {

  name:string="";
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.name=this.authService.getUserName();
  }
}
