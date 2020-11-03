import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit {
  @Input() product: Product;
  chosenProductQty: number = 1;

  constructor() {}

  ngOnInit(): void {}

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }

  get minusBtnDisabled(): boolean {
    return this.chosenProductQty <= 1 ? true : false;
  }

  get plusBtnDisabled(): boolean {
    return this.chosenProductQty >= this.product.availableQty ? true : false;
  }

  decQtyClick() {
    this.chosenProductQty--;
    if (this.chosenProductQty < 1) this.chosenProductQty = 1;
  }

  incQtyClick() {
    this.chosenProductQty++;
    if (this.chosenProductQty > this.product.availableQty)
      this.chosenProductQty = this.product.availableQty;
  }

  onProductQtyChange(input: string) {
    if (Number.isInteger(input)) {
      this.chosenProductQty = parseInt(input);
      if (this.chosenProductQty > this.product.availableQty)
        this.chosenProductQty = this.product.availableQty;
      else if (this.chosenProductQty < 1) this.chosenProductQty = 1;
    }
    console.log(this.chosenProductQty)
  }
}
