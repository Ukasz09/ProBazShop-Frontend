import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getClientShoppingHistory(clientId: string): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/mock/shopping-history.json');
  }
}
