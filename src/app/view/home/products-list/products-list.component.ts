import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { SortMethod } from 'src/app/model/sort-method';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  static readonly MAX_STARS_NUMBER = 5;
  readonly availableSortMethods = new Map([
    ['newest', new SortMethod<Product>('From newest')],
    ['low', new SortMethod<Product>('Price: low to high')],
    ['high', new SortMethod<Product>('Price: high to low')],
    ['oldest', new SortMethod<Product>('From oldest')],
  ]);

  @Output() addToCartClick: EventEmitter<
    [CartProduct, Product]
  > = new EventEmitter();
  @Output() productRowClick: EventEmitter<Product> = new EventEmitter();

  initSortMethodKey = 'newest';
  productsDataReady = false;
  itemsPerPage = 5;
  products: Product[] = [];
  productsPerPage: Product[] = [];
  httpError: { statusCode: number; msg: string } = undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.productsPerPage = this.products.slice(0, this.itemsPerPage);
        this.productsDataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Product loading error: ' + e.statusText,
        })
    );
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
      if (pos > 0) window.scrollTo(0, pos - 30);
      // how far to scroll on each step
      else window.clearInterval(scrollToTop);
    }, 16);
  }

  changeSortingMethod(sortMethod: SortMethod<Product>) {
    console.log('Need to apply sort for: ', sortMethod.labelText);
  }

  onAddToCartClick(cartProduct: CartProduct, product: Product) {
    this.addToCartClick.emit([cartProduct, product]);
  }

  onProductRowClick(selectedProduct: Product) {
    this.productRowClick.emit(selectedProduct);
  }
}