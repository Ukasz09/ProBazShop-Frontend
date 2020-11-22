import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { ProductsQtyPickerComponent } from 'src/app/view/shared/views/products-qty-picker/products-qty-picker.component';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCartClick: EventEmitter<CartProduct> = new EventEmitter();
  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }
  chosenProductQty = 1;

  constructor() {}

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
