import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AppAlerts } from 'src/app/shared/app-alerts';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userList: User[] = [];
  actualChosenUser: User = undefined;
  httpError: { statusCode: number; msg: string } = undefined;
  usersFetched = false;

  get actualLoggedUser(): User {
    return this.authService.LoggedUser;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersFetched = false;
    this.userService.getUsersList().subscribe(
      (data: User[]) => this.onOkUserFetchResponse(data),
      (e: HttpErrorResponse) => this.onErrorUserFetchResponse(e)
    );
  }

  private onOkUserFetchResponse(data: User[]) {
    this.userList = data;
    this.setActualDisplayedUserToFst();
    this.usersFetched = true;
  }

  private onErrorUserFetchResponse(error: HttpErrorResponse) {
    this.httpError = {
      statusCode: error.status,
      msg: 'Users data fetching error: ' + error.statusText,
    };
  }

  private setActualDisplayedUserToFst() {
    if (this.userList.length > 0) this.actualChosenUser = this.userList[0];
  }

  onUpdateConfirmed(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(
      (response: any) =>
        this.onCorrectResponse(
          AppAlerts.USER_UPDATE_SUCCESSFUL,
          response.message
        ),
      (err: HttpErrorResponse) =>
        this.onErrorResponse(AppAlerts.USER_UPDATE_ERROR, err)
    );
  }

  private onCorrectResponse(alertId: string, msg: string) {
    this.alertService.addAlert(AppAlerts.getSuccessAlert(alertId, msg));
    this.fetchUsers();
  }

  private onErrorResponse(alertId: string, error: HttpErrorResponse) {
    this.alertService.addAlert(
      AppAlerts.getDangerAlert(
        alertId,
        error.status + ': ' + error.statusText + ' - ' + error.error?.message
      )
    );
  }

  onDeleteUserConfirmed(user: User) {
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        this.onCorrectResponse(
          AppAlerts.USER_DELETE_SUCCESSFUL,
          response.message
        );
        this.setActualDisplayedUserToFst();
      },
      (error: HttpErrorResponse) =>
        this.onErrorResponse(AppAlerts.USER_DELETE_ERROR, error.error.message)
    );
  }

  // private deleteUserFromArr(user: User) {
  //   const index = this.userList.indexOf(user, 0);
  //   if (index > -1) this.userList.splice(index, 1);
  // }

  showDeleteBtn(user: User): boolean {
    return user.id != this.actualLoggedUser.id;
  }
}
