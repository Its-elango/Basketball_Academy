import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

export class Coach {
  constructor(
    public id: number,
    public fullName: string,
    public experience: number,
    public primarySkill: string,
    public photo: SafeResourceUrl,
  ) {}
  
}

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrl: './coach-list.component.scss'
})
export class CoachListComponent implements OnInit {

  coaches:Coach[]=[];
  id!:number;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.authService.getUserId();
    this.coachlist();
    
  }

  EnrollPlayer(id: number, name: string) {
    this.router.navigate(['/player/enroll'], {
      queryParams: { id: id, name: name},
    });
  }

  
  coachlist() {
    const url = `https://localhost:7021/api/Admission/CoachList`;

    this.httpClient.get<any[]>(url).subscribe((Response: Coach[]) => {
      console.log(Response);
      this.coaches = Response.map((coaches: any) => {

        const imageUrl = `data:image/png;base64,${coaches.photo}`;
        const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        return new Coach(
          coaches.id,
          coaches.fullName,
          coaches.experience,
          coaches.primarySkill,
          safeImageUrl,
        );
      });
    });
  }

}
