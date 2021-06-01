import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { User } from 'src/app/model/user';
import { AlertsService as AlertService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AppAlerts } from 'src/app/shared/app-alerts';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() _user: User;

  get user(): User {
    if (this._user == undefined) return this.authService.LoggedUser;
    return this._user;
  }

  get userHaveAdminPrivilages(): boolean {
    return this.authService.UserHasAdministrativePrivileges;
  }

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onUpdateConfirmed(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(
      (response: any) =>
        this.onCorrectUserUpdateResponse(response.message, updatedUser),
      (err: HttpErrorResponse) => this.onErrorUserUpdateResponse(err)
    );
  }

  private onCorrectUserUpdateResponse(msg: string, updatedUser: User) {
    this.alertService.addAlert(
      AppAlerts.getSuccessAlert(AppAlerts.USER_UPDATE_SUCCESSFUL, msg)
    );
    this.authService.setLoggedUser(updatedUser);
  }

  private onErrorUserUpdateResponse(error: HttpErrorResponse) {
    this.alertService.addAlert(
      AppAlerts.getDangerAlert(
        AppAlerts.USER_UPDATE_ERROR,
        error.status + ': ' + error.statusText + ' - ' + error.error?.message
      )
    );
  }

  onDeleteUserConfirmed() {
    this.alertService.addAlert(
      AppAlerts.getSuccessAlert(
        AppAlerts.USER_DELETE_SUCCESSFUL,
        'User correctly removed'
      )
    );
  }
}
