import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { HomeComponent } from '../../home.component';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.scss'],
})
export class ProductItemRowComponent implements OnInit {
  @Input() product: Product;
  @Output() productRowClick = new EventEmitter();

  get placeholderImgPath(): string {
    return HomeComponent.PLACEHOLDER_IMG_PATH;
  }

  constructor() {}

  ngOnInit(): void {}

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }
}
