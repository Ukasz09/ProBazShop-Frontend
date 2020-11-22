import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart-product-row',
  templateUrl: './cart-product-row.component.html',
  styleUrls: ['./cart-product-row.component.scss'],
})
export class CartProductRowComponent implements OnInit {
  @Input() product: Product;
  @Input() qty = 1;
  @Output() incChosenProductQtyClick = new EventEmitter();
  @Output() decChosenProductQtyClick = new EventEmitter();
  @Output() removeFromCartClick: EventEmitter<Product> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
