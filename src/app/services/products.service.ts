import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//TODO: tmp mocked
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/assets/mock/categories.json');
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      '/assets/mock/products.json'
      // '/assets/mock/empty-arr.json'
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>('/assets/mock/product:' + id + '.json');
  }
}
