import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationChoiceComponent } from './view/authentication/authentication-choice/authentication-choice.component';
import { LoginComponent } from './view/authentication/login/login.component';
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { CartComponent } from './view/cart/cart.component';
import { HomeComponent } from './view/home/home.component';
import { ShipmentPageComponent } from './view/shipment-page/shipment-page.component';
import { ShoppingHistoryComponent } from './view/shopping-history/shopping-history.component';
import { UserInfoComponent } from './view/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'authentication-choice', component: AuthenticationChoiceComponent },
  {
    path: 'authentication-choice/registration',
    component: RegistrationComponent,
  },
  { path: 'authentication-choice/login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart/shipment', component: ShipmentPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'client/history', component: ShoppingHistoryComponent },
  { path: 'client/info', component: UserInfoComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
