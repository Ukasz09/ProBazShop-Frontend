import { Injectable } from '@angular/core';
import { User, UserAccountType } from '../model/user';
import { environment } from 'src/environments/environment';
import { UserEndpoints } from 'src/app/data/UserEndpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedUser = undefined;

  get UserIsLogged() {
    return this.LoggedUser !== undefined;
  }

  setLoggedUser(user: User) {
    this._loggedUser= user;
  }

  get LoggedUser(): User {
    return this._loggedUser;
  }

  get UserHasAdministrativePrivileges(): boolean {
    return (
      this.UserIsLogged &&
      this.LoggedUser.type == UserAccountType.EMPLOYEE
    );
  }

  constructor(private http: HttpClient) {}

  logonUser(email: string, password: string): Observable<User> {
    let endpoint =
      environment.API_URL +
      UserEndpoints.LOGIN_URI +
      '?email=' +
      email +
      '&password=' +
      password;
    return this.http.get<User>(endpoint);
  }

  logoutUser() {
    this._loggedUser = undefined;
  }
}
