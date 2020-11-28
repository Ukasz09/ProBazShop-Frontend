import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AlertsService as AlertService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';

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
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onUpdateConfirmed(updatedUser: User) {
    console.log(updatedUser);
    this.alertService.addAlert(
      FormAlerts.getSuccessAlert(
        FormAlerts.USER_UPDATE_CONFIRMED_ID,
        'User correctly updated'
      )
    );
  }

  onDeleteUserConfirmed() {
    console.log('Need to delete user');
    this.alertService.addAlert(
      FormAlerts.getSuccessAlert(
        FormAlerts.USER_REMOVE_CONFIRMED_ID,
        'User correctly removed'
      )
    );
  }
}
