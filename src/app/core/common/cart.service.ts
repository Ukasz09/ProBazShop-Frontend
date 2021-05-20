import { Injectable } from '@angular/core';
import { OrderedProduct } from '../../model/ordered-product';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Map<Product, number> = new Map(); // <product, products qty>

  constructor() {}

  public addToCart(product: Product, qty: number): void {
    const actualProductQty = this.productInCartQty(product);
    const newProductQty = actualProductQty + qty;
    this.changeProductInCartQty(product, newProductQty);
  }

  public productInCartQty(product: Product): number {
    const actualProductQty = this.cart.get(product);
    return actualProductQty ?? 0;
  }

  public isInCart(product: Product): boolean {
    return this.productInCartQty(product) > 0;
  }

  public removeFromCart(product: Product): boolean {
    return this.cart.delete(product);
  }

  public clear(): void {
    this.cart.clear();
  }

  public changeProductInCartQty(product: Product, qty: number): void {
    this.cart.set(product, qty);
  }

  /* ------------------------------------------- Getters & Setters ------------------------------------------- */

  get orderedProductList(): OrderedProduct[] {
    const orderedProducts = [];
    for (const product of this.cart.keys()) {
      const orderedProduct = new OrderedProduct(
        product.id,
        product.name,
        product.description,
        product.imageUrl,
        product.size,
        product.color,
        product.price,
        this.cart.get(product),
        new Date()
      );
      orderedProducts.push(orderedProduct);
    }
    return orderedProducts;
  }
}
