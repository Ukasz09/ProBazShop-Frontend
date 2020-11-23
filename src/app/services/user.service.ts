import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderedProduct } from '../model/ordered-product';
import { environment } from 'src/environments/environment';
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
}
