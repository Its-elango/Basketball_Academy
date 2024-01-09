import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class Incharge {
  constructor(
    public name: string,
  ) {}
}


@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'] 
})
export class AddEventsComponent implements OnInit {

  incharges:Incharge[]=[];

  successMessage: boolean = false;
  FailureMessage: boolean = false;
 
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate')?.setAttribute('min', today);

    this.getIncharge()
  }

  getIncharge() {
    const url = `https://localhost:7021/api/Event/Incharge`;

    this.httpClient.get<Incharge[]>(url).subscribe(
      (Response:Incharge[]) => {
      console.log(Response);
      this.incharges=Response;
    })

  }
  

  events = new FormGroup({
    eventName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    eventDate: new FormControl('', Validators.required),
    incharge: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    venue: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    ageGroup: new FormControl('', Validators.required),
    prizeDetails: new FormControl('', Validators.required),
    contact: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
    eventImage: new FormControl('',Validators.required)
  });

  get eventName() {
    return this.events.get('eventName');
  }

  get eventDate() {
    return this.events.get('eventDate');
  }

  get incharge() {
    return this.events.get('incharge');
  }

  get eventTime() {
    return this.events.get('eventTime');
  }

  get venue() {
    return this.events.get('venue');
  }

  get details() {
    return this.events.get('details');
  }

  get ageGroup() {
    return this.events.get('ageGroup');
  }

  get prizeDetails() {
    return this.events.get('prizeDetails');
  }

  get contact() {
    return this.events.get('contact');
  }

  get eventImage() {
    return this.events.get('eventImage');
  }

  navigateToAllEvents() {
    this.router.navigate(['/admin/list_events']);
  }

  AddEvent() {
    const url = `https://localhost:7021/api/Event/AddEvents`;
console.log(this.events.value);
    this.httpClient.post(url,this.events.value,{responseType:'text'}).subscribe(
      (result) => {
        
        console.log(result);
        if(result==='1')
        {
          this.successMessage=true;
          this.events.reset();
        }
        else if(result==='0')
          {
          this.FailureMessage=true;
          }
        
      }
    );
    console.log(this.events.value);
  }
 
  onPhotoChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];
        this.events.patchValue({
          eventImage: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }  

 
handleCheckboxSelection() {
 debugger; 
  const checkboxes = document.querySelectorAll('input[name="AgeGroup"]');

  checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
      
          if (checkbox.checked) {
             
              const selectedValue = checkbox.value;

         
              if (selectedValue === "Under 12") {
                this.events.patchValue({
                  ageGroup: selectedValue
                });
                 
              } else if (selectedValue === "12 to 18") {
                this.events.patchValue({
                  ageGroup: selectedValue
                });
        
              } else {
                  console.log("No age group selected");
                
              }
          }
      }
  });
}


  }
  

  

