import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './view/home/home.component';
import { AuthenticationChoiceComponent } from './view/authentication/authentication-choice/authentication-choice.component';
import { AuthenticationPageComponent } from './view/authentication/authentication-page/authentication-page.component';
import { NavbarContainerComponent } from './view/navbar/navbar-container/navbar-container.component';
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { LoginComponent } from './view/authentication/login/login.component';
import { FormUiGeneratorComponent } from './view/shared/forms/form-ui-generator/form-ui-generator.component';
import { ControlMessagesComponent } from './view/shared/forms/control-messages/control-messages.component';
import { ConfirmModalComponent } from './view/shared/modals/confirm-modal/confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    ControlMessagesComponent,
    FormUiGeneratorComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
