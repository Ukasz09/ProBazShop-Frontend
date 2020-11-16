import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart-product-row',
  templateUrl: './cart-product-row.component.html',
  styleUrls: ['./cart-product-row.component.scss'],
})
export class CartProductRowComponent implements OnInit {
  productsInCart: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
