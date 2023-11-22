import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { CardsComponent } from './components/cards/cards.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HelpCardComponent } from './components/help-card/help-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './profile/about/about.component';
import { PaymentComponent } from './profile/payment/payment.component';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { ProductComponent } from './profile/products/products.component';
import { HomeWebComponent } from './profile/home-web/home-web.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    CardCarouselComponent,
    ProfileComponent,
    EditProfileComponent,
    SettingComponent,
    CardsComponent,
    ChangePasswordComponent,
    HelpCardComponent,
    AboutComponent,
    PaymentComponent,
    GalleryComponent,
    ProductComponent,
    HomeWebComponent,
    ProfileCardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,   
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
		ToastNoAnimationModule.forRoot(),
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
