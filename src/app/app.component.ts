import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertModel } from './model/alert.model';
import { AlertsService } from './services/alerts.service';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (data: { email: string }) => {
        this.router.navigateByUrl(`auth/callback?email=${data.email}`);
      },
      error: (_) => {},
    });
  }

  static getLogoImgPath(): string {
    return this.LOGO_IMG_PATH;
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }
}
