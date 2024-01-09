import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

export class Coach {
  constructor(public name: string) {}
}

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.scss']
})
export class ViewRegistrationComponent implements OnInit {
  coaches: Coach[] = [];
  eventID!: number; 

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute 
  ) {}


ngOnInit() {
  debugger;
  this.route.params.subscribe(params => {
      this.eventID = params['eventId']; 
      this.getRegistration();
  });
}


  getRegistration() {
    debugger;
    const url = `https://localhost:7021/api/Event/ViewRegistration/`+this.eventID;
    this.httpClient.get<Coach[]>(url).subscribe(
      (response: Coach[]) => { 
        console.log(response);
        this.coaches = response;
      },
    );
  }
}