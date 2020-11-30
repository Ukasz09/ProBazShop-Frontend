import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AuthenticationChoiceComponent } from './view/authentication/authentication-choice/authentication-choice.component';
import { LoginComponent } from './view/authentication/login/login.component';
import { RegistrationComponent } from './view/authentication/registration/registration.component';
import { CartComponent } from './view/cart/cart.component';
import { HomeComponent } from './view/home/home.component';
import { Page404Component } from './view/page404/page404.component';
import { ShipmentPageComponent } from './view/shipment-page/shipment-page.component';
import { ShoppingHistoryComponent } from './view/shopping-history/shopping-history.component';
import { UserInfoComponent } from './view/user-info/user-info.component';
import { UsersListComponent } from './view/users-list/users-list.component';

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
  {
    path: 'users',
    component: UsersListComponent,
  },
  { path: '404', component: Page404Component },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/404' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
