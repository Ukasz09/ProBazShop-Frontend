import { Component, OnInit } from '@angular/core';
import { OrderedProduct } from 'src/app/model/ordered-product';
import { UserService } from 'src/app/services/user.service';
import { SortUtils } from 'src/app/shared/logic/SortUtils';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.scss'],
})
export class ShoppingHistoryComponent implements OnInit {
  private static readonly SORTING_METHODS = {
    newest: {
      text: 'From newest',
      comp: ShoppingHistoryComponent.byDateDscComparator,
    },
    oldest: {
      text: 'From oldest',
      comp: ShoppingHistoryComponent.byDateAscComparator,
    },
  };
  actualSortingMethod = ShoppingHistoryComponent.SORTING_METHODS.newest;
  get sorthingMethodsKeys(): string[] {
    return Object.keys(ShoppingHistoryComponent.SORTING_METHODS);
  }
  shoppingHistoryFetched = false;
  shoppingHistory: OrderedProduct[] = [];
  actualDisplayedProduct: OrderedProduct = undefined;

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.userServices
      .getClientShoppingHistory('')
      .subscribe((data: OrderedProduct[]) => {
        this.shoppingHistory = data.sort(this.actualSortingMethod.comp);
        if (this.shoppingHistory.length > 0)
          this.actualDisplayedProduct = this.shoppingHistory[0];
        this.shoppingHistoryFetched = true;
      });
  }

  onRowClick(product: OrderedProduct) {
    this.actualDisplayedProduct = product;
  }

  changeSortingMethod(methodKey: string) {
    this.actualSortingMethod =
      ShoppingHistoryComponent.SORTING_METHODS[methodKey];
    this.shoppingHistory = this.shoppingHistory.sort(
      this.actualSortingMethod.comp
    );
  }

  getSortingMethodLabelTxt(methodKey: string): string {
    let labelTxt = ShoppingHistoryComponent.SORTING_METHODS[methodKey].text;
    return labelTxt ?? methodKey;
  }

  getSortingMethod(
    methodKey: string
  ): { text: string; com: (a: OrderedProduct, b: OrderedProduct) => number } {
    return ShoppingHistoryComponent.SORTING_METHODS[methodKey];
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
