import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderedProduct } from 'src/app/model/ordered-product';
import { SortMethod } from 'src/app/model/sort-method';
import { UserService } from 'src/app/services/user.service';
import { SortUtils } from 'src/app/shared/logic/SortUtils';
import { NavbarComponent } from '../navbar/navbar.component';

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
  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.userServices
      .getClientShoppingHistory('')
      .subscribe((data: OrderedProduct[]) => {
        let actualSortMethod = this.availableSortMethods.get(
          this.initSortMethodKey
        );
        this.shoppingHistory = data.sort(actualSortMethod.comp);
        if (this.shoppingHistory.length > 0)
          this.actualDisplayedProduct = this.shoppingHistory[0];
        this.shoppingHistoryFetched = true;
      });
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
