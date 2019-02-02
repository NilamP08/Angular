import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'home/registration',component:RegistrationComponent},
  {path:'home/login',component:LoginComponent},
  {path:'dashboard',component:DashbordComponent,canActivate:[AuthGuard]},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword/:email',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'update',component:UpdateComponent,canActivate:[AuthGuard]},  
  {path:'**',component:PageNotFoundComponent},
  {path: '', component:DashbordComponent, pathMatch:'full', canActivate:[AuthGuard]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
 }


