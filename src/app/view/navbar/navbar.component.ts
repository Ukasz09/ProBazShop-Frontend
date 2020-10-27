import { Component, OnInit } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AppComponent } from 'src/app/app.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  AppComponent = AppComponent;
  isBs3 = isBs3();
  searchedPhrase: string = '';
  searchKeywords: string[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.searchKeywords = this.productsService.getProductsKeywords();
  }



  get userIsLogged() {
    return AppComponent.userIsLogged;
  }
}
