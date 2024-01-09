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
  ) {}
}

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrl: './view-players.component.scss'
})
export class ViewPlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getEnrolledPlayer();
    
  }
  deletePlayer(id: number) {
    this.httpClient
      .delete(`https://localhost:7021/api/Admission/DeletePlayer/`+id, { responseType: 'text',}).subscribe(
        () => {
        this.router.navigate(['/admin/list_player']);
        this.getEnrolledPlayer();
      });
  }

  getEnrolledPlayer() {
    const url = `https://localhost:7021/api/Admission/ViewEnrolledPlayer`;
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

}


