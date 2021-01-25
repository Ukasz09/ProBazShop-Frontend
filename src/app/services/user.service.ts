import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderedProduct } from '../model/ordered-product';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { UserEndpoints } from 'src/app/data/UserEndpoints';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getClientShoppingHistory(clientId: string): Observable<OrderedProduct[]> {
    let endpoint =
      environment.API_URL + UserEndpoints.USER_HISTORY_URI + '/' + clientId;
    return this.http.get<OrderedProduct[]>(endpoint).pipe(
      map((products) => {
        products.forEach(
          (p: OrderedProduct) =>
            (p.orderDate = new Date(Date.parse(p.orderDate.toString())))
        );
        return products;
      })
    );
    // '/assets/mock/shopping-history.json'
  }

  postUser(user: User): Observable<User> {
    let endpoint = environment.API_URL + UserEndpoints.USERS_URI;
    return this.http.post<User>(endpoint, user);
  }

  updateUser(user: User): Observable<any> {
    let endpoint =
      environment.API_URL + UserEndpoints.USERS_URI + '/' + user.id;
    return this.http.put(endpoint, user);
  }

  orderProducts(user: User, cartProducts: OrderedProduct[]) {
    //let updatedHistory = user.history.concat(cartProducts);
    //let updatedUser = { ...user };
    //updatedUser.history = updatedHistory;
    let endpoint = environment.API_URL + '/api/order?userId='+user.id;
    return this.http.post(endpoint,cartProducts);
  }

  getUsersList(): Observable<User[]> {
    let endpoint = environment.API_URL + UserEndpoints.USERS_URI;
    return this.http.get<User[]>(endpoint);

    // '/assets/mock/users.json'
    // '/assets/mock/empty-arr.json'
  }

  deleteUser(userId: string): Observable<any> {
    let endpoint = environment.API_URL + UserEndpoints.USERS_URI + '/' + userId;
    return this.http.delete(endpoint);
  }
}
