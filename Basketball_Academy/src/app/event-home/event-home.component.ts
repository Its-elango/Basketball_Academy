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
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrl: './event-home.component.scss'
})

export class EventHomeComponent {

  failureMessage:boolean=false;
  successMessage:boolean=false;
  events:Event[]=[];
  Id!:number;
  coachId!:number;



constructor(
  private httpClient: HttpClient,
  private sanitizer: DomSanitizer,
  private authService:AuthServiceService
) {}

ngOnInit(): void {
  this.getEvents();
  this.coachId=this.authService.getUserId();
}

getEvents() {
  this.httpClient
    .get<any[]>('https://localhost:7021/api/Event/HomeEvent')
    .subscribe((response: any[]) => {
      console.log(response);
      this.events = response.map((events: any) => {

        this.Id=events.eventID;
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

RegisterEvent()
{
  this.Id;
  this.coachId;
  const url=`https://localhost:7021/api/Event/RegisterEvent/${this.Id}/${this.coachId}`;

  this.httpClient.post(url,{responseType:'text'}).subscribe(
    (Response)=>{
      debugger;
      if(Response===1)
      {
        this.successMessage=true;
        this.failureMessage=false;
      }
      else if(Response===0)
      {
        this.successMessage=false;
        this.failureMessage=true;
      }
    }
  )
}

}
