import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderedProduct } from '../model/ordered-product';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  getClientShoppingHistory(clientId: string): Observable<OrderedProduct[]> {
    return this.http.get<OrderedProduct[]>(
      '/assets/mock/shopping-history.json'
      // '/assets/mock/empty-arr.json'
      );
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
