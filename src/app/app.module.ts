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
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriesPanelComponent } from './view/home/categories-panel/categories-panel.component';
import { ProductsListComponent } from './view/home/products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemRowComponent } from './view/home/products-list/product-item-row/product-item-row.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxStarsModule } from 'ngx-stars';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppliedFiltersComponent } from './view/home/categories-panel/applied-filters/applied-filters.component';
import { ShoppingHistoryComponent } from './view/shopping-history/shopping-history.component';
import { ControlMessagesComponent } from './shared/forms/control-messages/control-messages.component';
import { FormUiGeneratorComponent } from './shared/forms/form-ui-generator/form-ui-generator.component';
import { CartProductRowComponent } from './view/cart/cart-product-row/cart-product-row.component';
import { CartComponent } from './view/cart/cart.component';
import { OrderedProductRowComponent } from './view/shopping-history/ordered-product-row/ordered-product-row.component';
import { DataLoadingComponent } from './shared/components/data-loading/data-loading.component';
import { ConfirmModalComponent } from './shared/components/modals/confirm-modal/confirm-modal.component';
import { ProductItemDetailsComponent } from './shared/components/product-item-details/product-item-details.component';
import { ProductsQtyPickerComponent } from './shared/components/products-qty-picker/products-qty-picker.component';
import { SortBtnComponent } from './shared/components/sort-btn/sort-btn.component';
import { EmptyResultsComponent } from './shared/components/empty-results/empty-results.component';
import { UserInfoComponent } from './view/user-info/user-info.component';
import { ShipmentPageComponent } from './view/shipment-page/shipment-page.component';
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
    AppliedFiltersComponent,
    CartComponent,
    CartProductRowComponent,
    DataLoadingComponent,
    ProductsQtyPickerComponent,
    ShoppingHistoryComponent,
    OrderedProductRowComponent,
    SortBtnComponent,
    EmptyResultsComponent,
    UserInfoComponent,
    ShipmentPageComponent,
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
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
