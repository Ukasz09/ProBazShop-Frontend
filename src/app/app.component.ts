import { Component } from '@angular/core';
import { AlertModel } from './model/alert.model';
import { User } from './model/user';
import { AlertsService } from './services/alerts.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProBazShop';
  static LOGO_IMG_PATH = 'assets/logo2.png';

  constructor() {}

  static getLogoImgPath(): string {
    return this.LOGO_IMG_PATH;
  }
}
