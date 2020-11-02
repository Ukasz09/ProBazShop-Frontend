import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  static readonly MAX_STARS_NUMBER = 5;
  private static readonly SORTING_METHODS = {
    newest: 'From newest',
    low: 'Price: low to high',
    high: 'Price: high to low',
  };

  itemsPerPage = 5;
  actualSortingMethod = ProductsListComponent.SORTING_METHODS.newest;
  products: Product[] = [];
  productsPerPage: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.productsPerPage = this.products.slice(0, this.itemsPerPage);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.productsPerPage = this.products.slice(startItem, endItem);
    this.scrollToTopSmothly();
  }

  private scrollToTopSmothly() {
    // window.scroll(0,0);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  changeSortingMethod(methodKey: string) {
    this.actualSortingMethod = methodKey;
  }

  get sorthingMethodsKeys(): string[] {
    return Object.keys(ProductsListComponent.SORTING_METHODS);
  }

  getSortingMethodLabelTxt(methodKey: string): string {
    let labelTxt = ProductsListComponent.SORTING_METHODS[methodKey];
    return labelTxt ?? methodKey;
  }
}
