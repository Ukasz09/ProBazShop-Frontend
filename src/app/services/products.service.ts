import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsEndpoints } from '../data/ProductEndpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/assets/mock/categories.json');
  }

  getAllProducts(): Observable<Product[]> {
    let endpoint = environment.API_URL + ProductsEndpoints.ALL_PRODUCTS_URI;
    return this.http.get<Product[]>(endpoint);
    // '/assets/mock/products.json'
    // '/assets/mock/empty-arr.json'
  }

  getAllProductsFilterName(name: string): Observable<Product[]> {
    let endpoint =
      environment.API_URL +
      ProductsEndpoints.ALL_PRODUCTS_URI +
      '?name=' +
      name;
    return this.http.get<Product[]>(endpoint);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>('/assets/mock/product:' + id + '.json');
  }
}
