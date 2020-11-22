import { Component } from '@angular/core';
import { AlertModel } from './model/alert.model';
import { AlertsService } from './services/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProBazShop';
  static userIsLogged = true;
  static LOGO_IMG_PATH = 'assets/logo2.png';

  constructor(private alertService: AlertsService) {}

  static getLogoImgPath(): string {
    return this.LOGO_IMG_PATH;
  }

  //TODO: change to service
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
    // AppComponent.userIsLogged = true;
  }

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

  removeAlert(id: string) {
    this.alertService.removeAlertFromId(id);
  }
}
