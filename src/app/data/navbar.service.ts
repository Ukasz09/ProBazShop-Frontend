import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private phraseSuggestion$: BehaviorSubject<string> = new BehaviorSubject('');
  private selectedProductFromSuggestion$: BehaviorSubject<Product> = new BehaviorSubject(undefined);
  public navbarIsVisible = true;

  constructor() {}

  public addPhraseSuggestion(phrase: string): void {
    this.phraseSuggestion$.next(phrase);
  }

  public addSelectedProductFromSuggestion(product: Product): void {
    this.selectedProductFromSuggestion$.next(product);
  }
}
