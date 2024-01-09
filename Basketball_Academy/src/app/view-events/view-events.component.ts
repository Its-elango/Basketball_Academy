
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})

export class ViewEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  deleteEvent(id: number) {
    this.httpClient.delete(`https://localhost:7021/api/Event/DeleteEvent/`+id, { responseType: 'text' })
      .subscribe(() => {
        
        this.router.navigate(['/admin/list_events']);
        this.getEvents();
      });
  }

navigateToRegistration(eventID: number) {
  debugger;
  this.router.navigate(['/admin/list_registration', eventID]);
}


  navigateToAddEvent() {
    this.router.navigate(['/admin/add_events']);
  }

  getEvents() {
    this.httpClient
      .get<any[]>('https://localhost:7021/api/Event/ViewEvents')
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