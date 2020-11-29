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
    let endpoint = environment.API_URL + ProductsEndpoints.CATEGORIES_URI;
    return this.http.get<string[]>(
      endpoint
      // '/assets/mock/categories.json'
    );
  }

  getAllProducts(): Observable<Product[]> {
    let endpoint = environment.API_URL + ProductsEndpoints.PRODUCTS_URI;
    return this.http.get<Product[]>(endpoint);
    // '/assets/mock/products.json'
    // '/assets/mock/empty-arr.json'
  }

  getAllProductsWithFilters(
    name: string,
    category: string[],
    color: string[],
    priceLTE: string,
    priceGTE: string,
    size: string[],
    sort: string
  ): Observable<Product[]> {
    console.log(name, category, color, priceLTE, priceGTE, size);
    let endpoint = environment.API_URL + ProductsEndpoints.PRODUCTS_URI;
    let nameQuery = name !== undefined ? 'name=' + name : undefined;
    let categoryQuery =
      category.length > 0 ? 'category=' + category.toString() : undefined;
    let colorQuery = color.length > 0 ? 'color=' + color.toString() : undefined;
    let sizesQuery = size.length > 0 ? 'size=' + size.toString() : undefined;
    let priceLTEQuery =
      priceLTE !== undefined ? 'price_to=' + priceLTE : undefined;
    let priceGTEQuery =
      priceGTE !== undefined ? 'price_from=' + priceGTE : undefined;
    endpoint += '?';
    if (nameQuery !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += nameQuery;
    }
    if (categoryQuery !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += categoryQuery;
    }
    if (colorQuery !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += colorQuery;
    }
    if (sizesQuery !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += sizesQuery;
    }
    if (priceGTE !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += priceGTEQuery;
    }
    if (priceLTE !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += priceLTEQuery;
    }
    if (sort !== undefined) {
      endpoint += endpoint.charAt(endpoint.length - 1) == '?' ? '' : '&';
      endpoint += 'sort=' + sort;
    }
    console.log(endpoint);
    return this.http.get<Product[]>(endpoint);
  }

  getProduct(id: string): Observable<Product> {
    let endpoint =
      environment.API_URL + ProductsEndpoints.PRODUCTS_URI + '/' + id;
    return this.http.get<Product>(endpoint);
    // '/assets/mock/product:' + id + '.json'
  }
}
