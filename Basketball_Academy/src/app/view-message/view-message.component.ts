
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class Message {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public email: string,
    public message: string
  ) {}
}

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.scss'
})
export class ViewMessageComponent {

  messages:Message[]=[];

  constructor(private httpClient: HttpClient, private router: Router) {}

  
  deleteMessage(id: number) {
    this.httpClient.delete(`https://localhost:7021/api/Admin/DeleteMessage/`+id,{responseType:'text'}).subscribe(
      () => {
        this.router.navigate(['/admin/feedback']);
        this.getfeedback(); 
      },
    );
  }

  ngOnInit(): void {
    this.getfeedback();
  }

  getfeedback() {
    this.httpClient.get<Message[]>('https://localhost:7021/api/Admin/ViewMessage').subscribe(
      (response: Message[]) => {
        console.log(response);
        this.messages = response;
      },
    );
  }

}








