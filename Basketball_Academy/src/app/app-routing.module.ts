import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './Layout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { ViewCoachComponent } from './view-coach/view-coach.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { ViewRegistrationComponent } from './view-registration/view-registration.component';
import { ViewPlayersComponent } from './view-players/view-players.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { CoachLayoutComponent } from './Layout/coach-layout/coach-layout.component';
import { CoachHomeComponent } from './coach-home/coach-home.component';
import { CoachUpdateComponent } from './coach-update/coach-update.component';
import { CoachEventsComponent } from './coach-events/coach-events.component';
import { CoachPlayersComponent } from './coach-players/coach-players.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayerHomeComponent } from './player-home/player-home.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { PlayerEventsComponent } from './player-events/player-events.component';
import { PlayerEnrollComponent } from './player-enroll/player-enroll.component';
import { EnrolledPlayersComponent } from './enrolled-players/enrolled-players.component';
import { EventHomeComponent } from './event-home/event-home.component';
import { PlayerLayoutComponent } from './Layout/player-layout/player-layout.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthServiceService } from './auth-service.service';
import { EventEditComponent } from './event-edit/event-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'about', component: AboutComponent },
      { path: 'forget_password', component: ForgetPasswordComponent },
      { path: 'contact', component: ContactComponent },
    
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthServiceService],
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'add_admin', component: AddAdminComponent },
      { path: 'list_admin', component: ViewAdminComponent },
      { path: 'add_coach', component: AddCoachComponent },
      { path: 'list_coach', component: ViewCoachComponent },
      { path: 'edit_event/:eventId', component: EventEditComponent },
      { path: 'list_enrolled', component: EnrolledPlayersComponent },
      { path: 'add_events', component: AddEventsComponent },
      { path: 'list_events', component: ViewEventsComponent },
      { path: 'list_registration/:eventId', component: ViewRegistrationComponent },
      { path: 'list_player', component: ViewPlayersComponent },
      { path: 'list_user', component: ViewUserComponent },
      { path: 'feedback', component: ViewMessageComponent },

    ]
  },
  {
    path: 'coach',
    component: CoachLayoutComponent,
    canActivate: [AuthServiceService],
    children: [
      { path: 'home', component: CoachHomeComponent },
      { path: 'update', component: CoachUpdateComponent },
      { path: 'my_events', component: CoachEventsComponent },
      { path: 'my_players', component: CoachPlayersComponent }
      
    ]
  },
  {
    path: 'player',
    component:PlayerLayoutComponent,
    canActivate: [AuthServiceService],
    children: [
      { path: 'home', component: PlayerHomeComponent },
      { path: 'update', component: PlayerUpdateComponent },
      { path: 'my_events', component: PlayerEventsComponent },
      { path: 'enroll_academy', component: CoachListComponent },
      { path: 'enroll', component: PlayerEnrollComponent },
      
    ]
  },
{ path: 'forbidden' ,component: ForbiddenComponent },

  { path: '**', component: NotFoundComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
