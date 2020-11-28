import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  phraseSuggestion$: BehaviorSubject<string> = new BehaviorSubject('');
  selectedProductFromSuggestion$: BehaviorSubject<
    Product
  > = new BehaviorSubject(undefined);
  navbarIsVisible = true;

  constructor() {}

  addPhraseSuggestion(phrase: string) {
    this.phraseSuggestion$.next(phrase);
  }

  addSelectedProductFromSuggestion(product: Product) {
    this.selectedProductFromSuggestion$.next(product);
  }
}
