import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrl: './player-update.component.scss'
})
export class PlayerUpdateComponent implements OnInit {

  successMessage: boolean = false;
  FullName: string = '';
  email: string = '';
  id!: number;

  PlayerUpdate=new FormGroup({
    id:new FormControl(''),
    FullName: new FormControl(''),
    email: new FormControl(''),
    DateOfBirth: new FormControl('', Validators.required),
    Age: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', Validators.required),
    ParentGuardianName: new FormControl('', Validators.required),
    ParentGuardianPhone: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),

  })

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }


  ngOnInit(): void {

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date')?.setAttribute('max', today);

    this.FullName = this.authService.getUserName();
    this.email = this.authService.getEmail();
    this.id = this.authService.getUserId();

    this.PlayerUpdate.patchValue({
      id: this.id.toString(),
      FullName: this.FullName,
      email: this.email
    });
  }

  
  
  get fullName(){
    return this.PlayerUpdate.get('FullName');
  }
  get date(){
    return this.PlayerUpdate.get('DateOfBirth');
  }
  get Gender(){
    return this.PlayerUpdate.get('Gender');
  }
  get PhoneNumber(){
    return this.PlayerUpdate.get('PhoneNumber');
  }
  get Email(){
    return this.PlayerUpdate.get('email');
  }
  get Age(){
    return this.PlayerUpdate.get('Age');
  }
  get ParentGuardianName(){
    return this.PlayerUpdate.get('ParentGuardianName');
  }
  get ParentGuardianPhone(){
    return this.PlayerUpdate.get('ParentGuardianPhone');
  }

  get photo(){
    return this.PlayerUpdate.get('photo');
  }
  
  
  playerUpdate()
  {
    if(this.PlayerUpdate.valid)
    {
      const id=this.authService.getUserId();
    const url=`https://localhost:7021/api/Admission/UpdatePlayer/`;

    this.httpClient.put(url+id,this.PlayerUpdate.value,{responseType:'text'}).subscribe
    ((Response)=>
    {
      console.log(this.PlayerUpdate.value);
      if(Response==='1')
      {
        console.log(Response);
        this.successMessage=true;
        this.PlayerUpdate.reset();

      }
      else if(Response==='0')
      {
        this.successMessage=false;
      }
      else{
        this.successMessage=false;
      }
    })
    console.log(this.PlayerUpdate.value);


    }
    
  }

  
  onPhotoChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(",")[1];
        this.PlayerUpdate.patchValue({
          photo: base64String
        });
      };

      reader.readAsDataURL(file);
    }
  }  

  calculateAge() {
    const dateOfBirthControl = this.PlayerUpdate.get('DateOfBirth');
  
    if (dateOfBirthControl && dateOfBirthControl.value) {
      const birthDate: Date = new Date(dateOfBirthControl.value);
      const today: Date = new Date();
  
      const age: number = today.getFullYear() - birthDate.getFullYear();
      this.PlayerUpdate.patchValue({
        Age: age.toString()
      });
  
    } else {
      console.error('Date of birth is null or undefined.');
    }

}

}
