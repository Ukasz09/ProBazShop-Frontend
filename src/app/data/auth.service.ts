import { Injectable } from '@angular/core';
import { User, UserAccountType } from '../model/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSlugs } from './slugs';
import { NGXLogger } from 'ngx-logger';
import { tap } from 'rxjs/operators';

// -----------------------------------------------------------------------------
// TODO: SSO / JWT - authentication and authorization has been temporary mocked
// -----------------------------------------------------------------------------
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedUser = undefined;

  constructor(private http: HttpClient, private logger: NGXLogger) {}

  public logonUser(email: string, password: string): Observable<User> {
    const slug = UserSlugs.LOGIN.replace('{email}', email).replace(
      '{password}',
      password
    );
    const url = `${environment.authApi}/${slug}`;
    return this.http
      .get<User>(url)
      .pipe(tap((data) => this.logger.debug(data)));
  }

  public logoutUser(): void {
    this.loggedUser = undefined;
  }

  /* ------------------------------------------- Getters & Setters ------------------------------------------- */
  get userIsLogged(): boolean {
    return this.loggedUser !== undefined;
  }

  get userHasEmployeeRights(): boolean {
    return (
      this.userIsLogged && this.loggedUser.type === UserAccountType.EMPLOYEE
    );
  }
}
