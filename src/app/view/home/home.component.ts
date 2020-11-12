import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { AlertBase } from '../shared/alert-base';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AlertBase implements OnInit, AfterViewInit {
  @ViewChild(ProductsListComponent) productListComponent: ProductsListComponent;

  constructor() {
    super();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  get products(): Product[] {
    return this.productListComponent?.products ?? [];
  }
}
