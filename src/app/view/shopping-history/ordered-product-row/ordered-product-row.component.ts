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

  get formattedOrderDate(): string {
    let date = this.orderedProduct.orderDate;
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return [
      (dd > 9 ? '' : '0') + dd,
      (mm > 9 ? '' : '0') + mm,
      date.getFullYear(),
    ].join('-');
  }

  get PayedPrice() {
    return this.orderedProduct.orderedQty * this.orderedProduct.pricePerItem;
  }

  constructor() {}

  ngOnInit(): void {}
}
