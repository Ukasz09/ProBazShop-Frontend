import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsInCart: Map<Product, number> = new Map(); // product, qty
  priceToPay = 0;
  httpError: { statusCode: number; msg: string } = undefined;

  get dataReady() {
    return this.productsInCart.size == this.cartService.productsInCart.size;
  }

  get cartIsEmpty(): boolean {
    return this.cartService.productsInCart.size == 0;
  }

  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.fetchProductsFromCart();
  }

  private fetchProductsFromCart() {
    for (let cartItemProperty of this.cartService.productsInCart.entries()) {
      let productId = cartItemProperty[0].id;
      let qty = cartItemProperty[1];
      this.productService.getProduct(productId).subscribe(
        (data: Product) => {
          this.productsInCart.set(data, qty);
          this.priceToPay += data.price * qty;
        },
        (e: HttpErrorResponse) =>
          (this.httpError = {
            statusCode: e.status,
            msg: 'Cart loading error: ' + e.statusText,
          })
      );
    }
  }

  onIncProductQtyClick(product: Product) {
    let chosenProductQty = this.productsInCart.get(product);
    chosenProductQty++;
    if (chosenProductQty > product.availableQty)
      chosenProductQty = product.availableQty;
    else this.priceToPay += product.price;

    this.productsInCart.set(product, chosenProductQty);
    this.cartService.updateProductsQty(product, chosenProductQty);
  }

  onDecProductQtyClick(product: Product) {
    let chosenProductQty = this.productsInCart.get(product);
    chosenProductQty--;
    if (chosenProductQty < 1) chosenProductQty = 1;
    else this.priceToPay -= product.price;
    this.productsInCart.set(product, chosenProductQty);
    this.cartService.updateProductsQty(product, chosenProductQty);
  }

  onRemoveProductFromCartClick(product: Product) {
    let qtyOfRemovedProduct = this.productsInCart.get(product);
    this.priceToPay -= product.price * qtyOfRemovedProduct;
    this.cartService.removeProductFromCart(product);
    this.productsInCart.delete(product);
  }
}
