import { AuthGuard } from './auth.guard';

//import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';


import{ReactiveFormsModule} from'@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { from } from 'rxjs';
//import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

import { CommonModule } from '@angular/common';
import{HttpModule} from '@angular/http';
import { CandidatesService } from './candidates.service';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashbordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,    
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2300
    })
  ],
  providers: [AuthGuard,CandidatesService],
  bootstrap: [AppComponent],
  exports:[RegistrationComponent]
})
export class AppModule { }
