import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-player-enroll',
  templateUrl: './player-enroll.component.html',
  styleUrls: ['./player-enroll.component.scss']
})
export class PlayerEnrollComponent implements OnInit {
  id!: number;
  Coachid!: number;
  email: string = "";
  Coach: string = '';

  enrollMessage: boolean = false;
  noCoachMessage: boolean = false;
  existplayerMessage: boolean = false;


  enrollForm = new FormGroup({
    id: new FormControl(''),
    FullName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    DateOfBirth: new FormControl('', Validators.required),
    Age: new FormControl(''),
    Coachid: new FormControl(''),
    Coach: new FormControl(''),
    email: new FormControl(''),
    Gender: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
    ChooseMonths: new FormControl('', Validators.required),
    ParentGuardianName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    ParentGuardianPhone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
    payment: new FormControl('', Validators.required),
    photo: new FormControl('',Validators.required)
  });


  get fullName(){
    return this.enrollForm.get('FullName');
  }
  get date(){
    return this.enrollForm.get('DateOfBirth');
  }
  get Gender(){
    return this.enrollForm.get('Gender');
  }
  get PhoneNumber(){
    return this.enrollForm.get('PhoneNumber');
  }
  get ChooseMonths(){
    return this.enrollForm.get('ChooseMonths');
  }
  get payment(){
    return this.enrollForm.get('payment');
  }
  get ParentGuardianName(){
    return this.enrollForm.get('ParentGuardianName');
  }
  get ParentGuardianPhone(){
    return this.enrollForm.get('ParentGuardianPhone');
  }

  get photo(){
    return this.enrollForm.get('photo');
  }
  constructor(
    private httpClient: HttpClient,
    private authService: AuthServiceService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date')?.setAttribute('max', today);
    
    this.id = this.authService.getUserId();
    this.email = this.authService.getEmail();

    this.route.queryParams.subscribe((params) => {
      this.Coachid = params['id'];
      this.Coach = params['name'];


      this.enrollForm.patchValue({
        Coachid: this.Coachid.toString(),
        Coach: this.Coach
      });
    });

    this.enrollForm.patchValue({
      id: this.id.toString(),
      email: this.email
    });

  }


  EnrollForm(event: Event) {
    if(this.enrollForm.valid){
      event.preventDefault();

      const url = `https://localhost:7021/api/Admission/EnrollPlayer/`;
  
      this.httpClient.post(url, this.enrollForm.value, { responseType: 'text' }).subscribe(
        (Response: string) => {
          if (Response === '1') {
            console.log(Response);
            this.enrollMessage = true;
            this.noCoachMessage = false;
            this.existplayerMessage = false;
            this.enrollForm.reset();
          } else if (Response === '2') {
            this.enrollMessage = false;
            this.noCoachMessage = false;
            this.existplayerMessage = true;
          } else if (Response === '3') {
            this.enrollMessage = false;
            this.noCoachMessage = true;
            this.existplayerMessage = false;
          }
        }
      );
      console.log(this.enrollForm.value);

    }
   
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];
        this.enrollForm.patchValue({
          photo: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }

  calculateAge() {
    const dateOfBirthControl = this.enrollForm.get('DateOfBirth');
  
    if (dateOfBirthControl && dateOfBirthControl.value) {
      const birthDate: Date = new Date(dateOfBirthControl.value);
      const today: Date = new Date();
  
      const age: number = today.getFullYear() - birthDate.getFullYear();
      this.enrollForm.patchValue({
        Age: age.toString()
      });
  
    } else {
      console.error('Date of birth is null or undefined.');
    }

}

}
