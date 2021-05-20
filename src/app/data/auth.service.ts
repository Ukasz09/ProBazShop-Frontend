import { Injectable } from '@angular/core';
import { User, UserAccountType } from '../model/user';
import { environment } from 'src/environments/environment';
import { UserSlugs } from 'src/app/data/slugs/UserSlugs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// -----------------------------------------------------------------------------
// TODO: SSO / JWT - tmp mocked authentication and authorization has been mocked
// -----------------------------------------------------------------------------
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUser = undefined;

  get UserIsLogged() {
    return this.LoggedUser !== undefined;
  }

  setLoggedUser(user: User) {
    this.loggedUser = user;
  }

  get LoggedUser(): User {
    return this.loggedUser;
  }

  get UserHasAdministrativePrivileges(): boolean {
    return (
      this.UserIsLogged && this.LoggedUser.type == UserAccountType.EMPLOYEE
    );
  }

  constructor(private http: HttpClient) {}

  logonUser(email: string, password: string): Observable<User> {
    let endpoint =
      environment.API_URL +
      UserSlugs.LOGIN +
      '?email=' +
      email +
      '&password=' +
      password;
    return this.http.get<User>(endpoint).pipe(tap((data) => console.log(data)));
    // return this.http.get<User>('/assets/mock/user.json');
  }

  logoutUser() {
    this.loggedUser = undefined;
  }
}
