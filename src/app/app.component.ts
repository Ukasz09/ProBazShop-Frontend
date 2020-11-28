import { Component } from '@angular/core';
import { AlertModel } from './model/alert.model';
import { User } from './model/user';
import { AlertsService } from './services/alerts.service';
import { NavbarService } from './services/navbar.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  static LOGO_IMG_PATH = 'assets/logo2.png';

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

  get alertClass(): string {
    return this.navbarService.navbarIsVisible
      ? 'sticky-to-navbar'
      : 'sticky-top';
  }

  constructor(
    private alertService: AlertsService,
    private navbarService: NavbarService
  ) {}

  static getLogoImgPath(): string {
    return this.LOGO_IMG_PATH;
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }
}
