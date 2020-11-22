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

  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.fetchProductsFromCart();
    // this.fetchProductsMocked();
  }

  private fetchProductsFromCart() {
    for (let cartItemProperty of this.cartService.productsInCart.entries()) {
      let productId = cartItemProperty[0];
      let qty = cartItemProperty[1];
      this.productService.getProduct(productId).subscribe((data: Product) => {
        this.productsInCart.set(data, qty);
      });
    }
  }

  private fetchProductsMocked() {
    this.productService.getProduct('1').subscribe((data: Product) => {
      this.productsInCart.set(data, 5);
    });
    this.productService.getProduct('2').subscribe((data: Product) => {
      this.productsInCart.set(data, 2);
    });
    this.productService.getProduct('4').subscribe((data: Product) => {
      this.productsInCart.set(data, 4);
    });
  }

  onIncProductQtyClick(product: Product) {
    let chosenProductQty = this.productsInCart.get(product);
    chosenProductQty++;
    if (chosenProductQty > product.availableQty)
      chosenProductQty = product.availableQty;
    this.productsInCart.set(product, chosenProductQty);
    this.cartService.updateProductsQty(product.id, chosenProductQty);
  }
  onDecProductQtyClick(product: Product) {
    let chosenProductQty = this.productsInCart.get(product);
    chosenProductQty--;
    if (chosenProductQty < 1) chosenProductQty = 1;
    this.productsInCart.set(product, chosenProductQty);
    this.cartService.updateProductsQty(product.id, chosenProductQty);
  }

  onRemoveProductFromCartClick(product: Product) {
    this.cartService.removeProductFromCart(product.id);
    this.productsInCart.delete(product);
  }
}
