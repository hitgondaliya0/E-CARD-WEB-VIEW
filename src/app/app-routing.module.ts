import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HelpCardComponent } from './components/help-card/help-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path : 'home' , component : HomeComponent 
  },
  {
    path : 'card-carousel' , component : CardCarouselComponent
  },
  {
    path: 'profile', component : ProfileComponent
  },
  {
    path: 'profile-card', component : ProfileCardComponent
  },
  {
    path : 'edit-profile' , component : EditProfileComponent
  },
  {
    path : 'setting' , component : SettingComponent
  },
  {
    path : 'dashboard', component : DashboardComponent
  }, 
  {
    path : 'cards' , component : CardsComponent
  },
  {
    path:'help' , component : HelpCardComponent
  },
  {
    path : 'change-password' , component : ChangePasswordComponent
  },
  {
    path : '', redirectTo : '/home', pathMatch : 'full'
  },
  {
    path :'verify-otp' , component : VerifyOtpComponent
  }
  // , {
  //   path :'**', redirectTo : '/home' , pathMatch : 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
