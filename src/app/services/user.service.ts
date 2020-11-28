import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderedProduct } from '../model/ordered-product';
import { User, UserAccountType } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  //TODO: tmp mocked
  private _loggedUser: User = new User(
    'Lukasz',
    'Gajerski',
    '234324@sad.com',
    '213131',
    [],
    UserAccountType.EMPLOYEE
  );

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

  constructor(private http: HttpClient) {}

  getClientShoppingHistory(clientId: string): Observable<OrderedProduct[]> {
    return this.http.get<OrderedProduct[]>(
      '/assets/mock/shopping-history.json'
      // '/assets/mock/empty-arr.json'
      );
    }
    
    logonUser(user: User) {
      this._loggedUser = user;
    }
    
    logoutUser() {
      this._loggedUser = undefined;
    }
    
    postUser(user: User) {
      //TODO: perform post operation
    }
    
    getUsersList(): Observable<User[]> {
      return this.http.get<User[]>(
        '/assets/mock/users.json'
        // '/assets/mock/empty-arr.json'
      );
  }
}
