import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart: Map<string, number> = new Map(); //id,qty

  constructor() {}

  /**
   *
   * @return false - qtyToAdd is not valid, true  - otherwise
   */
  addProductWithQtyValidation(
    id: string,
    qtyToAdd: number,
    maxProductQty: number
  ): boolean {
    let actualProductQty = this.getProductQty(id);
    if (
      qtyToAdd <= 0 ||
      maxProductQty <= 0 ||
      qtyToAdd + actualProductQty > maxProductQty
    )
      return false;

    this.productsInCart.set(id, actualProductQty + qtyToAdd);
    return true;
  }

  getProductQty(id: string) {
    let actualProductQty = this.productsInCart.get(id);
    return actualProductQty ?? 0;
  }

  removeProductFromCart(id: string): boolean {
    return this.productsInCart.delete(id);
  }
}
