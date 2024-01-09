import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthServiceService } from '../auth-service.service';

export class Event {
  constructor(
    public eventID: number,
    public eventName: string,
    public eventDate: string,
    public eventTime: string,
    public venue: string,
    public details: string,
    public incharge: string,
    public ageGroup: number,
    public prizeDetails: string,
    public contact: string,
    public eventImage:SafeResourceUrl
  ) {}
}

@Component({
  selector: 'app-coach-events',
  templateUrl: './coach-events.component.html',
  styleUrl: './coach-events.component.scss'
})
export class CoachEventsComponent implements OnInit {
events:Event[]=[];

id!:number;

constructor(
  private httpClient: HttpClient,
  private sanitizer: DomSanitizer,
  private authService: AuthServiceService
) {}

ngOnInit(): void {
  this.id = this.authService.getUserId();
  this.getEvents();
}

getEvents() {
  this.httpClient
    .get<any[]>('https://localhost:7021/api/Event/ViewMyEvent/'+this.id)
    .subscribe((response: any[]) => {
      console.log(response);
      this.events = response.map((events: any) => {

        const imageUrl = `data:image/png;base64,${events.eventImage}`;
        const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

        const dateOfEvent = new Date(events.eventDate).toLocaleDateString();
        const timeOfEvent = events.eventTime.toString();

        return new Event(
          events.eventID,
          events.eventName,
          dateOfEvent,
          timeOfEvent,
          events.venue,
          events.details,
          events.incharge,
          events.ageGroup,
          events.prizeDetails,
          events.contact,
          safeImageUrl
        );
      });
    });
}

}
