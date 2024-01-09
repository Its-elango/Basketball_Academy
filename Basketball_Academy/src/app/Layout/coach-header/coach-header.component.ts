import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-coach-header',
  templateUrl: './coach-header.component.html',
  styleUrls: ['./coach-header.component.scss']
})
export class CoachHeaderComponent implements OnInit {

  name: string = "";

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {

  }

  signout()
  {
    this.authService.logout();
  }

}
