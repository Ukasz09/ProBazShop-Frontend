import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderedProduct } from 'src/app/model/ordered-product';

@Component({
  selector: 'app-ordered-product-row',
  templateUrl: './ordered-product-row.component.html',
  styleUrls: ['./ordered-product-row.component.scss'],
})
export class OrderedProductRowComponent implements OnInit {
  @Input() orderedProduct: OrderedProduct;
  @Output() rowClick = new EventEmitter();

  get PayedPrice() {
    return this.orderedProduct.orderedQty * this.orderedProduct.pricePerItem;
  }

  constructor() {}

  ngOnInit(): void {}
}
