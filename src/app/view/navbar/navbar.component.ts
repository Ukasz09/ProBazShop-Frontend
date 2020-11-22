import { Component, Input, OnInit } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  static readonly NAVBAR_HEIGHT_PX = 120;
  AppComponent = AppComponent;
  isBs3 = isBs3();
  searchedPhrase: string = '';
  searchKeywords: string[] = [];
  products: Product[] = [];

  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  get userIsLogged() {
    return AppComponent.userIsLogged;
  }

  constructor(private productService: ProductsService) {}

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }
}
