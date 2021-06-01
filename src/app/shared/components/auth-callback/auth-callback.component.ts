import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AppAlerts } from '../../app-alerts';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkAuthState();
  }

  private checkAuthState(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.onSuccessfulLogin(email);
    } else {
      this.onFailedLogin();
    }
  }

  private onSuccessfulLogin(facebookId: string): void {
    this.fetchUser(facebookId);
    this.router.navigateByUrl('/home');
  }

  private fetchUser(email: string): void {
    this.userService.getUser(email).subscribe({
      next: (user: User) => {
        this.authService.setLoggedUser(user);
        this.alertService.clearAllAlerts();
        this.alertService.addAlert(
          AppAlerts.getSuccessAlert(
            AppAlerts.SUCCESSFUL_LOGON_ALERT_ID,
            'You were successful logged in'
          )
        );
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.addAlert(
          AppAlerts.getDangerAlert(
            AppAlerts.INVALID_DATA_ALERT_ID,
            'Error - user data not found'
          )
        );
      },
    });
  }

  private onFailedLogin(): void {
    this.alertService.clearAllAlerts();
    this.alertService.addAlert(
      AppAlerts.getDangerAlert(
        AppAlerts.INVALID_DATA_ALERT_ID,
        'Login failed. Please, try once again'
      )
    );
    this.router.navigateByUrl('/home');
  }
}
