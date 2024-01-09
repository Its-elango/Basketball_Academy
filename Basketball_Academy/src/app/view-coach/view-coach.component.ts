import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

export class Coach {
  constructor(
    public id: number,
    public fullName: string,
    public username: string,
    public email: string,
    public dateOfBirth: string,
    public age: number,
    public gender: string,
    public phoneNumber: string,
    public experience: number,
    public photo: SafeResourceUrl,
    public certificateProof: SafeResourceUrl,
    public idproof: SafeResourceUrl
  ) {}
}

@Component({
  selector: 'app-view-coach',
  templateUrl: './view-coach.component.html',
  styleUrls: ['./view-coach.component.scss'],
})
export class ViewCoachComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getCoach();
  }

  getPhotoUrl(photoBase64: string): SafeResourceUrl {
    const imageUrl = `data:image/jpeg;base64,${photoBase64}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  deleteCoach(id: number) {
    this.httpClient
      .delete(`https://localhost:7021/api/Coach/DeleteCoach/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        this.router.navigate(['/admin/list_coach']);
        this.getCoach();
      });
  }
  navigateToAddCoach() {
    this.router.navigate(['/admin/add_coach']);
  }

  getCoach() {
    this.httpClient
      .get<any[]>('https://localhost:7021/api/Coach/ViewCoach')
      .subscribe((response: Coach[]) => {
        this.coaches = response.map((coach: any) => {


          const imageUrl = `data:image/png;base64,${coach.photo}`;
          const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

          const safeCertificateUrl: SafeResourceUrl = this.getSafePdfUrl(coach.certificateProof);
          const safePdfUrl: SafeResourceUrl = this.getSafePdfUrl(coach.idproof);

          const dateOfBirth = new Date(coach.dateOfBirth).toLocaleDateString();

          return new Coach(
            coach.id,
            coach.fullName,
            coach.username,
            coach.email,
            dateOfBirth,
            coach.age,
            coach.gender,
            coach.phoneNumber,
            coach.experience,
            safeImageUrl,
            safeCertificateUrl,
            safePdfUrl
          );
        });
      });
  }

  private getSafePdfUrl(pdfBase64: string): SafeResourceUrl {
    const pdfUrl = `data:application/pdf;base64,${pdfBase64}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
}
