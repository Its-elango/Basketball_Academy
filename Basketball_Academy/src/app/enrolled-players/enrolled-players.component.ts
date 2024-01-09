import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Player {
  constructor(
    public id: number,
    public fullName: string,
    public email: string,
    public dateOfBirth: string,
    public age: number,
    public gender: string,
    public phoneNumber: string,
    public chooseMonths: number,
    public coach: string,
    public parentGuardianName: string,
    public parentGuardianPhone: number,
    public payment:string,
    public status: number
  ) {}
}

@Component({
  selector: 'app-enrolled-players',
  templateUrl: './enrolled-players.component.html',
  styleUrls: ['./enrolled-players.component.scss']
})
export class EnrolledPlayersComponent implements OnInit {
  players: Player[] = [];

  itemId!:number;
  status!:number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getEnrolledPlayer();
    
  }

  getEnrolledPlayer() {
    const url = `https://localhost:7021/api/Admission/ViewPlayer`;
    this.httpClient.get<Player[]>(url).subscribe(
      (response: Player[]) => {
        console.log(response);
        this.players = response;
        this.players.forEach(player => {
          player.dateOfBirth = new Date(player.dateOfBirth).toISOString().split('T')[0];
        });
      }
    );
    }
    
    changeStatus(itemId: number, newStatus: number) {
      const url = `https://localhost:7021/UpdateStatus/${itemId}/${newStatus}`;
      this.httpClient.post(url, {}).subscribe()
    }



}
