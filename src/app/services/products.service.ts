import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //TODO: tmp mocked - change to async based on title
  getProductsKeywords(): string[] {
    return [
      'spodnie',
      'jeans',
      'kurtka',
      'skórzana',
      'futerko',
      'buty',
      'adidasy',
      'trampki',
      'skórzane',
      'zamszowe',
      'duże',
      'spódnica',
      'sukienka',
    ];
  }

  //TODO: tmp mocked
  getCategories(): string[] {
    return [
      'Buty',
      'Plaszcze',
      'Spodnie',
      'T-shirty',
      'Kurtki',
      'Polary',
      'Spodenki',
      'Sukienki',
      'Spódnice',
    ];
  }

  //TODO: tmp mocked
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/mock/products.json');
  }
}
