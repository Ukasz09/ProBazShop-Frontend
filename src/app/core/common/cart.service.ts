import { Injectable } from '@angular/core';
import { OrderedProduct } from '../../model/ordered-product';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart: Map<Product, number> = new Map(); //id, qty

  get orderedProductList(): OrderedProduct[] {
    let orderedProducts = [];
    for (let productEntry of this.productsInCart.entries()) {
      let product = productEntry[0];
      let orderedProduct = new OrderedProduct(
        product.id,
        product.name,
        product.description,
        product.imageUrl,
        product.size,
        product.color,
        product.price,
        productEntry[1],
        new Date()
      );
      orderedProducts.push(orderedProduct);
    }
    return orderedProducts;
  }

  constructor() {}

  /**
   * @return false - qtyToAdd is not valid, true  - otherwise
   */
  addProductWithQtyValidation(
    product: Product,
    qtyToAdd: number,
    maxProductQty: number
  ): boolean {
    let actualProductQty = this.getProductQty(product);
    if (
      qtyToAdd <= 0 ||
      maxProductQty <= 0 ||
      qtyToAdd + actualProductQty > maxProductQty
    )
      return false;

    this.productsInCart.set(product, actualProductQty + qtyToAdd);
    return true;
  }

  getProductQty(product: Product) {
    let actualProductQty = this.productsInCart.get(product);
    return actualProductQty ?? 0;
  }

  removeProductFromCart(product: Product): boolean {
    for (let p of this.productsInCart.keys())
      if (p.id == product.id) return this.productsInCart.delete(p);
    return false;
  }

  clearProductList() {
    this.productsInCart.clear();
  }

  /**
   * @return false - not update, true  - otherwise
   */
  updateProductsQty(product: Product, qty: number): boolean {
    if (qty >= 1 && this.productsInCart.get(product) !== undefined) {
      this.productsInCart.set(product, qty);
      return true;
    }
    return false;
  }
}
