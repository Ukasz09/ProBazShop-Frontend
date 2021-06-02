import { Injectable } from '@angular/core';
import { User, UserAccountType } from '../model/user';
import { environment } from 'src/environments/environment';
import { UserEndpoints } from 'src/app/data/UserEndpoints';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageHttpResponse } from '../model/message-response';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedUser = undefined;

  get UserIsLogged() {
    return this.LoggedUser !== undefined;
  }

  setLoggedUser(user: User) {
    this._loggedUser = user;
  }

  get LoggedUser(): User {
    return this._loggedUser;
  }

  get UserHasAdministrativePrivileges(): boolean {
    return (
      this.UserIsLogged && this.LoggedUser.type == UserAccountType.EMPLOYEE
    );
  }

  constructor(private http: HttpClient) {}

  public logout(): Observable<MessageHttpResponse> {
    this._loggedUser = undefined;
    const url = `${environment.API_URL}/auth/logout`;
    return this.http.get<MessageHttpResponse>(url);
  }
}
