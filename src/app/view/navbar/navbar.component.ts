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
  AppComponent = AppComponent;
  isBs3 = isBs3();
  searchedPhrase: string = '';
  @Input() products: Product[] = [];
  searchKeywords: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.products)
  }

  get userIsLogged() {
    return AppComponent.userIsLogged;
  }
}
