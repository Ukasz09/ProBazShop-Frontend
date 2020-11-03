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
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { LoginComponent } from './view/authentication/login/login.component';
import { FormUiGeneratorComponent } from './view/shared/forms/form-ui-generator/form-ui-generator.component';
import { ControlMessagesComponent } from './view/shared/forms/control-messages/control-messages.component';
import { ConfirmModalComponent } from './view/shared/modals/confirm-modal/confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriesPanelComponent } from './view/home/categories-panel/categories-panel.component';
import { ProductsListComponent } from './view/home/products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemRowComponent } from './view/home/products-list/product-item-row/product-item-row.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductItemDetailsComponent } from './view/home/products-list/product-item-details/product-item-details.component';
import { NgxStarsModule } from 'ngx-stars';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationPageComponent,
    HomeComponent,
    RegistrationComponent,
    AuthenticationChoiceComponent,
    LoginComponent,
    ControlMessagesComponent,
    FormUiGeneratorComponent,
    ConfirmModalComponent,
    CategoriesPanelComponent,
    ProductsListComponent,
    ProductItemRowComponent,
    ProductItemDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
