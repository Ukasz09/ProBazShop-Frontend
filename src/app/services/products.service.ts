import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //TODO: tmp mocked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/assets/mock/categories.json');
  }

  //TODO: tmp mocked
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/mock/products.json');
  }
}
