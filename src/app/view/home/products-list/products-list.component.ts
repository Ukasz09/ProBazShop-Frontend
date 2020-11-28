import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { SortMethod } from 'src/app/model/sort-method';
import { FilterService } from 'src/app/services/filter.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProductsService } from 'src/app/services/products.service';
import {
  FilterElem,
  FilterType,
} from '../categories-panel/applied-filters/filter-model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, AfterViewInit, OnDestroy {
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
  maxPaginationItems = 12;
  products: Product[] = [];
  productsPerPage: Product[] = [];
  httpError: { statusCode: number; msg: string } = undefined;
  phraseSuggestionSubscription: Subscription;

  constructor(
    private productService: ProductsService,
    private navbarService: NavbarService,
    private filterService: FilterService
  ) {}

  ngAfterViewInit(): void {
    this.subscribeNavbarSearchBtnClick();
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  ngOnDestroy(): void {
    this.phraseSuggestionSubscription?.unsubscribe();
    this.clearNavbarBuffers();
  }

  //To avoid consuming already consumed data when switch to new page and then back to the home component
  private clearNavbarBuffers() {
    this.navbarService.phraseSuggestion$.next('');
  }

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.initProductsFromData(data);
        this.productsDataReady = true;
      },
      (e: HttpErrorResponse) => this.onDataFetchErrorResponse(e)
    );
  }

  private initProductsFromData(data: Product[]) {
    this.products = data;
    this.productsPerPage = this.products.slice(0, this.itemsPerPage);
  }

  private onDataFetchErrorResponse(error: HttpErrorResponse) {
    this.httpError = {
      statusCode: error.status,
      msg: 'Product loading error: ' + error.statusText,
    };
  }

  private subscribeNavbarSearchBtnClick() {
    this.phraseSuggestionSubscription = this.navbarService.phraseSuggestion$.subscribe(
      {
        next: (data: string) => {
          if (data) this.onSearchBtnClick(data);
        },
      }
    );
  }

  private onSearchBtnClick(searchedPhrase: string) {
    this.fetchProductsWithNameFilter(searchedPhrase);
    this.filterService.removeFstFilterWithType(FilterType.SEARCH_PHRASE);
    this.filterService.addFilter(searchedPhrase, FilterType.SEARCH_PHRASE);
  }

  fetchProductsWithFilters() {
    //TODO: tmp
    let filters = this.filterService.appliedFilters;
    this.productsDataReady = false;
    this.fetchAllProducts();
  }

  private fetchProductsWithNameFilter(name: string) {
    //TODO: change to get other filters
    this.productsDataReady = false;
    this.productService.getAllProductsFilterName(name).subscribe(
      (data: Product[]) => {
        this.initProductsFromData(data);
        this.productsDataReady = true;
      },
      (e: HttpErrorResponse) => this.onDataFetchErrorResponse(e)
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
