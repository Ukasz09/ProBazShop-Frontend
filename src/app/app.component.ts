import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProBazShop';
  static userIsLogged = false;
  static LOGO_IMG_PATH = 'assets/logo2.png';

  static getLogoImgPath(): string {
    return this.LOGO_IMG_PATH;
  }

  //TODO: tmp mocked
  static logonUser() {
    AppComponent.userIsLogged = true;
  }
  //TODO: tmp mocked
  static logoutUser() {
    AppComponent.userIsLogged = false;
  }

  //TODO: tmp mocked
  static registerUser() {
    AppComponent.userIsLogged = true;
  }
}
