import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './Layout/home-layout/home-layout.component';
import { HomeHeaderComponent } from './Layout/home-header/home-header.component';
import { PlayerLayoutComponent } from './Layout/player-layout/player-layout.component';
import { PlayerHeaderComponent } from './Layout/player-header/player-header.component';
import { CoachLayoutComponent } from './Layout/coach-layout/coach-layout.component';
import { CoachHeaderComponent } from './Layout/coach-header/coach-header.component';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './Layout/admin-header/admin-header.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PlayerHomeComponent } from './player-home/player-home.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { PlayerEventsComponent } from './player-events/player-events.component';
import { PlayerEnrollComponent } from './player-enroll/player-enroll.component';
import { CoachHomeComponent } from './coach-home/coach-home.component';
import { CoachUpdateComponent } from './coach-update/coach-update.component';
import { CoachEventsComponent } from './coach-events/coach-events.component';
import { CoachPlayersComponent } from './coach-players/coach-players.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { ViewRegistrationComponent } from './view-registration/view-registration.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { ViewCoachComponent } from './view-coach/view-coach.component';
import { ViewPlayersComponent } from './view-players/view-players.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { EnrolledPlayersComponent } from './enrolled-players/enrolled-players.component';
import { EventHomeComponent } from './event-home/event-home.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomeHeaderComponent,
    PlayerLayoutComponent,
    PlayerHeaderComponent,
    CoachLayoutComponent,
    CoachHeaderComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ContactComponent,
    AboutComponent,
    PlayerHomeComponent,
    PlayerUpdateComponent,
    PlayerEventsComponent,
    PlayerEnrollComponent,
    CoachHomeComponent,
    CoachUpdateComponent,
    CoachEventsComponent,
    CoachPlayersComponent,
    AdminHomeComponent,
    AddAdminComponent,
    ViewAdminComponent,
    AddEventsComponent,
    ViewEventsComponent,
    ViewRegistrationComponent,
    AddCoachComponent,
    ViewCoachComponent,
    ViewPlayersComponent,
    ViewUserComponent,
    ViewMessageComponent,
    FooterComponent,
    NotFoundComponent,
    EnrolledPlayersComponent,
    EventHomeComponent,
    CoachListComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FileSaverModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
