import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { userInfo } from 'os';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { UserService } from 'src/app/services/user.service';
import { ProductsListComponent } from 'src/app/view/home/products-list/products-list.component';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit {
  @Input() withAddToCartBtn = true;
  @Input() withStarRating = true;
  @Input() product: Product;
  @Output() addToCartClick: EventEmitter<CartProduct> = new EventEmitter();

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }

  get needToShowAddToCartBtn(): boolean {
    return this.withAddToCartBtn && this.userService.userIsLogged;
  }

  chosenProductQty = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  decQtyClick() {
    this.chosenProductQty--;
    if (this.chosenProductQty < 1) this.chosenProductQty = 1;
  }

  incQtyClick() {
    this.chosenProductQty++;
    if (this.chosenProductQty > this.product.availableQty)
      this.chosenProductQty = this.product.availableQty;
  }

  onAddToCartClick() {
    let cartProduct = new CartProduct(this.product.id, this.chosenProductQty);
    this.addToCartClick.emit(cartProduct);
  }
}
