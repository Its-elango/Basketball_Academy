import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-coach-update',
  templateUrl: './coach-update.component.html',
  styleUrls: ['./coach-update.component.scss']
})
export class CoachUpdateComponent implements OnInit {
  successMessage: boolean = false;
  FullName: string = '';
  email: string = '';
  id!: number;

  UpdateCoach = new FormGroup({
    id: new FormControl(''),
    FullName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl(''),
    DateOfBirth: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    experience: new FormControl('',[Validators.required,Validators.maxLength(2)]),
    PrimarySkill: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    photo: new FormControl('',Validators.required),
    idproof: new FormControl('',Validators.required),
    CertificateProof: new FormControl('',Validators.required)
  });

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }

  ngOnInit(): void {

    const today = new Date().toISOString().split('T')[0];
   document.getElementById('date')?.setAttribute('max', today);
  
    this.FullName = this.authService.getUserName();
    this.email = this.authService.getEmail();
    this.id = this.authService.getUserId();

    this.UpdateCoach.patchValue({
      id: this.id.toString(),
      FullName: this.FullName,
      email: this.email
    });
  }
  


  
  get fullName(){
    return this.UpdateCoach.get('FullName');
  }
  get date(){
    return this.UpdateCoach.get('DateOfBirth');
  }
  get age(){
    return this.UpdateCoach.get('age');
  }
  get Gender(){
    return this.UpdateCoach.get('Gender');
  }
  get Address(){
    return this.UpdateCoach.get('Address');
  }
  get PhoneNumber(){
    return this.UpdateCoach.get('PhoneNumber');
  }
  get Email(){
    return this.UpdateCoach.get('email');
  }
  get experience(){
    return this.UpdateCoach.get('experience');
  }
  get PrimarySkill(){
    return this.UpdateCoach.get('PrimarySkill');
  }

  updateCoach()
  {
    if(this.UpdateCoach.valid)
    {
      const id=this.authService.getUserId();
      const url=`https://localhost:7021/api/Coach/UpdateCoach/`;
  
      this.httpClient.put(url+id,this.UpdateCoach.value,{responseType:'text'}).subscribe
      ((Response)=>
      {
        console.log(this.UpdateCoach.value);
        if(Response==='1')
        {
          console.log(Response);
          this.successMessage=true;
          this.UpdateCoach.reset();
  
        }
        else if(Response==='0')
        {
          this.successMessage=false;
        }
        else{
          this.successMessage=false;
        }
      })
      console.log(this.UpdateCoach.value);
  
    }
   
  }



  onPhotoChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];

        this.UpdateCoach.patchValue({
          photo: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }  
  
  
  onIdChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];
        this.UpdateCoach.patchValue({
          idproof: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  } 
  
  
  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];
        this.UpdateCoach.patchValue({
          CertificateProof: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }

  calculateAge() {
    const dateOfBirthControl = this.UpdateCoach.get('DateOfBirth');
  
    if (dateOfBirthControl && dateOfBirthControl.value) {
      const birthDate: Date = new Date(dateOfBirthControl.value);
      const today: Date = new Date();
  
      const age: number = today.getFullYear() - birthDate.getFullYear();
      this.UpdateCoach.patchValue({
        age: age.toString()
      });
  
    } else {
      console.error('Date of birth is null or undefined.');
    }
}
}
