import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthServiceService } from '../auth-service.service';


export class Player {
  constructor(
    public id: number,
    public fullName: string,
    public age: number,
    public gender: string,
    public photo: SafeResourceUrl,
  ) {}
}

@Component({
  selector: 'app-coach-players',
  templateUrl: './coach-players.component.html',
  styleUrls: ['./coach-players.component.scss'] 
})

export class CoachPlayersComponent implements OnInit {
  players: Player[] = [];
  name!: string;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.getPlayers();
  }

  getPlayers() {
    const url = `https://localhost:7021/api/Admission/PlayerList/`;

    this.httpClient.get<any[]>(url + this.name).subscribe((Response: Player[]) => {
      console.log(Response);
      this.players = Response.map((player: any) => {

        const imageUrl = `data:image/png;base64,${player.photo}`;
        const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        return new Player(
          player.id,
          player.fullName,
          player.age,
          player.gender,
          safeImageUrl,
        );
      });
    });
  }
}
