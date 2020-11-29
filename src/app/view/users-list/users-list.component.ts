import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';

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
        this.onCorrectUserUpdateResponse(response.message, updatedUser),
      (err: HttpErrorResponse) => this.onErrorUserUpdateResponse(err)
    );
  }

  private onCorrectUserUpdateResponse(msg: string, updatedUser: User) {
    this.alertService.addAlert(
      FormAlerts.getSuccessAlert(FormAlerts.USER_UPDATE_SUCCESSFUL, msg)
    );
    this.fetchUsers();
  }

  private onErrorUserUpdateResponse(error: HttpErrorResponse) {
    this.alertService.addAlert(
      FormAlerts.getDangerFormAlert(
        FormAlerts.USER_UPDATE_ERROR,
        error.status + ': ' + error.statusText + ' - ' + error.error?.message
      )
    );
  }

  onDeleteUserConfirmed(user: User) {
    console.log('Need to delete user');
    this.deleteUserFromArr(user);
    this.setActualDisplayedUserToFst();
    this.alertService.addAlert(
      FormAlerts.getSuccessAlert(
        FormAlerts.USER_REMOVE_CONFIRMED_ID,
        'User correctly removed'
      )
    );
  }

  private deleteUserFromArr(user: User) {
    const index = this.userList.indexOf(user, 0);
    if (index > -1) this.userList.splice(index, 1);
  }

  showDeleteBtn(user: User): boolean {
    return user.id != this.actualLoggedUser.id;
  }
}
