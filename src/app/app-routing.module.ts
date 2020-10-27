import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationChoiceComponent } from './view/authentication/authentication-choice/authentication-choice.component';
import { LoginComponent } from './view/authentication/login/login.component';
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { HomeComponent } from './view/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'authentication-choice', component: AuthenticationChoiceComponent },
  {
    path: 'authentication-choice/registration',
    component: RegistrationComponent,
  },
  { path: 'authentication-choice/login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
