import { Injectable } from '@angular/core';
import { User, UserAccountType } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  //TODO: tmp mocked
  private _loggedUser: User = new User(
    'Lukasz',
    'Gajerski',
    '234324@sad.com',
    '213131',
    [],
    UserAccountType.CLIENT
  );

  // private _loggedUser: User = undefined;

  get UserIsLogged() {
    return this.LoggedUser !== undefined;
  }

  get LoggedUser(): User {
    return this._loggedUser;
  }

  get UserHasAdministrativePrivileges(): boolean {
    return (
      this.UserIsLogged &&
      this.LoggedUser.accountType == UserAccountType.EMPLOYEE
    );
  }

  logonUser(user: User) {
    this._loggedUser = user;
  }

  logoutUser() {
    this._loggedUser = undefined;
  }
}
