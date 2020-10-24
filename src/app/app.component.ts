import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProBazShop';
  static userIsLogged = false;

  //TODO: tmp mocked
  static logonUser() {
    AppComponent.userIsLogged = true;
  }
  //TODO: tmp mocked
  static logoutUser() {
    AppComponent.userIsLogged = false;
  }
}
