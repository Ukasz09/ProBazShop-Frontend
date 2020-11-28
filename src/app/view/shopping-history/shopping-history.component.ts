import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderedProduct } from 'src/app/model/ordered-product';
import { SortMethod } from 'src/app/model/sort-method';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from 'src/app/view/navbar/navbar.component';
import { SortUtils } from 'src/app/shared/logic/SortUtils';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.scss'],
})
export class ShoppingHistoryComponent implements OnInit {
  availableSortMethods = new Map([
    [
      'newest',
      new SortMethod(
        'From newest',
        ShoppingHistoryComponent.byDateDscComparator
      ),
    ],
    [
      'oldest',
      new SortMethod(
        'From oldest',
        ShoppingHistoryComponent.byDateAscComparator
      ),
    ],
  ]);
  initSortMethodKey = 'newest';
  shoppingHistoryFetched = false;
  shoppingHistory: OrderedProduct[] = [];
  actualDisplayedProduct: OrderedProduct = undefined;
  httpError: { statusCode: number; msg: string } = undefined;

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.userServices.getClientShoppingHistory('').subscribe(
      (data: OrderedProduct[]) => {
        let actualSortMethod = this.availableSortMethods.get(
          this.initSortMethodKey
        );
        this.shoppingHistory = data.sort(actualSortMethod.comp);
        if (this.shoppingHistory.length > 0)
          this.actualDisplayedProduct = this.shoppingHistory[0];
        this.shoppingHistoryFetched = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Data fetching error: ' + e.statusText,
        })
    );
  }

  onRowClick(product: OrderedProduct) {
    this.actualDisplayedProduct = product;
  }

  changeSortingMethod(sortMethod: SortMethod<OrderedProduct>) {
    this.sortShopingHistoryInPlace(sortMethod);
  }

  private sortShopingHistoryInPlace(sortMethod: SortMethod<OrderedProduct>) {
    this.shoppingHistory = this.shoppingHistory.sort(sortMethod.comp);
  }

  private static byDateDscComparator(
    a: OrderedProduct,
    b: OrderedProduct
  ): number {
    return SortUtils.compareDate(b.orderDate, a.orderDate);
  }

  private static byDateAscComparator(
    a: OrderedProduct,
    b: OrderedProduct
  ): number {
    return SortUtils.compareDate(a.orderDate, b.orderDate);
  }
}
