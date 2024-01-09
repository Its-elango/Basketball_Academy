import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrl: './player-home.component.scss'
})
export class PlayerHomeComponent implements OnInit {

  name:string="";
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.name=this.authService.getUserName();
  }



}
