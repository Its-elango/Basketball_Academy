import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router ,ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


export class Incharge {
  constructor(
    public name: string,
  ) {}
}

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'] 
})
export class EventEditComponent implements OnInit {

  incharges:Incharge[]=[];
  even!:number;
  successMessage: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router,  private route: ActivatedRoute ,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    (document.getElementById('eventDate') as HTMLInputElement).setAttribute('min', today);
    
    this.getIncharge();
    
    this.route.params.subscribe(params => {
       this.even= params['eventId']; 
       this.getEvent();
  });


  }

  getIncharge() {
    const url = `https://localhost:7021/api/Event/Incharge`;

    this.httpClient.get<Incharge[]>(url).subscribe(
      (Response:Incharge[]) => {
      console.log(Response);
      this.incharges=Response;
    })

  }

  navigateToAllEvents() {
    this.router.navigate(['/admin/list_events']);
  }

  UpdateEvent = new FormGroup({
    EventID: new FormControl(''),
    eventName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    eventDate: new FormControl('', Validators.required),
    incharge: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    venue: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    ageGroup: new FormControl('', Validators.required),
    prizeDetails: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    eventImage: new FormControl('', Validators.required)
  });

  get eventName() {
    return this.UpdateEvent.get('eventName');
  }

  get eventDate() {
    return this.UpdateEvent.get('eventDate');
  }

  get incharge() {
    return this.UpdateEvent.get('incharge');
  }

  get eventTime() {
    return this.UpdateEvent.get('eventTime');
  }

  get venue() {
    return this.UpdateEvent.get('venue');
  }

  get details() {
    return this.UpdateEvent.get('details');
  }

  get ageGroup() {
    return this.UpdateEvent.get('ageGroup');
  }

  get prizeDetails() {
    return this.UpdateEvent.get('prizeDetails');
  }

  get contact() {
    return this.UpdateEvent.get('contact');
  }

  get eventImage() {
    return this.UpdateEvent.get('eventImage');
  }

  getEvent() {
    this.httpClient.get<any[]>('https://localhost:7021/api/Event/EventByID/'+this.even).subscribe
    ((response: any[]) => {
      console.log(response);
    const result=response[0];

    this.UpdateEvent.patchValue({
      EventID:result.eventID,
      eventName:result.eventName,
      eventDate:result.eventDate,
      incharge:result.incharge,
      eventTime:result.eventTime,
      venue:result.venue,
      details:result.details,
      ageGroup:result.ageGroup,
      prizeDetails:result.prizeDetails,
      contact:result.contact,

    })     
      });
  }

  onPhotoChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(',')[1];
        this.UpdateEvent.patchValue({
          eventImage: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }

  handleCheckboxSelection() {
    const checkboxes = document.querySelectorAll('input[name="AgeGroup"]');

    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        if (checkbox.checked) {
          const selectedValue = checkbox.value;

          this.UpdateEvent.patchValue({
            ageGroup: selectedValue
          });
        }
      }
    });
  }

  updateEvent() {
    const url = `https://localhost:7021/api/Event/EditEvent/`+this.even;

    this.httpClient.put(url,this.UpdateEvent.value,{responseType:'text'}).subscribe((Response)=>
    {
        console.log(Response);

        if(Response==='1')
        {
          this.successMessage=true;
        }
    })
  }
}
