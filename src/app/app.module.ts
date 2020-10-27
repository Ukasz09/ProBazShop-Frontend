import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './view/home/home.component';
import { AuthenticationChoiceComponent } from './view/authentication/authentication-choice/authentication-choice.component';
import { AuthenticationPageComponent } from './view/authentication/authentication-page/authentication-page.component';
import { NavbarContainerComponent } from './view/navbar/navbar-container/navbar-container.component';
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { LoginComponent } from './view/authentication/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationPageComponent,
    HomeComponent,
    RegistrationComponent,
    AuthenticationChoiceComponent,
    NavbarContainerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
