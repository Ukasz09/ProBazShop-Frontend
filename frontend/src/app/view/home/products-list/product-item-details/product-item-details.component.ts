import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
