import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

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
}
