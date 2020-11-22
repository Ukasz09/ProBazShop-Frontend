import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { UserService } from 'src/app/services/user.service';
import { ProductItemRowComponent } from '../home/products-list/product-item-row/product-item-row.component';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.scss'],
})
export class ShoppingHistoryComponent implements OnInit {
  productsHistory: Product[] = [];
  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.userServices
      .getClientShoppingHistory('')
      .subscribe((data: Product[]) => (this.productsHistory = data));
  }
}
