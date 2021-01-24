import { Options } from '@angular-slider/ngx-slider';
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
import { FilterType } from '../categories-panel/applied-filters/filter-model';

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
  ]);

  @Output() addToCartClick: EventEmitter<
    [CartProduct, Product]
  > = new EventEmitter();
  @Output() productRowClick: EventEmitter<Product> = new EventEmitter();

  actualSortMethodKey = 'newest';
  productsDataReady = false;
  itemsPerPage = 5;
  maxPaginationItems = 12;
  products: Product[] = [];
  productsPerPage: Product[] = [];
  httpError: { statusCode: number; msg: string } = undefined;
  phraseSuggestionSubscription: Subscription;
  priceSliderOptions: Options = this.getSliderOptions(300);
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

  private getSliderOptions(maxProductPrice: number): Options {
    return {
      floor: 0,
      ceil: maxProductPrice,
      translate: (value: number): string => {
        return '$' + value;
      },
    };
  }

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.initProductsFromData(data);
        this.priceSliderOptions = this.getSliderOptions(
          this.getMaxProductPrice()
        );
        this.productsDataReady = true;
      },
      (e: HttpErrorResponse) => this.onDataFetchErrorResponse(e)
    );
  }

  private initProductsFromData(data: Product[]) {
    this.products = data;
    this.productsPerPage = this.products.slice(0, this.itemsPerPage);
  }

  private getMaxProductPrice() {
    let maxPrice = 0;
    for (let product of this.products)
      if (product.price > maxPrice) maxPrice = product.price;
    return maxPrice;
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
    this.filterService.removeFstFilterWithType(FilterType.SEARCH_PHRASE);
    this.filterService.addFilter(searchedPhrase, FilterType.SEARCH_PHRASE);
    this.fetchProductsWithFilters(this.getFiltersMap());
  }

  getFiltersMap(): Map<FilterType, string[]> {
    let filters = this.filterService.appliedFilters;
    let filtersMap: Map<FilterType, string[]> = new Map([
      [FilterType.CATEGORY, []],
      [FilterType.COLOR, []],
      [FilterType.SIZE, []],
      [FilterType.SEARCH_PHRASE, []],
      [FilterType.PRICE_LOW, []],
      [FilterType.PRICE_HIGH, []],
    ]);
    for (let filter of filters) filtersMap.get(filter.type).push(filter.value);
    return filtersMap;
  }

  fetchProductsWithFilters(filtersMap: Map<FilterType, string[]>) {
    //TODO: change to get other filters
    this.productsDataReady = false;
    let nameArr = filtersMap.get(FilterType.SEARCH_PHRASE);
    let name = nameArr.length > 0 ? nameArr[0] : undefined;
    let category = filtersMap.get(FilterType.CATEGORY);
    let color = filtersMap.get(FilterType.COLOR);
    let priceLTEArr = filtersMap.get(FilterType.PRICE_HIGH);
    let priceLTE = priceLTEArr.length > 0 ? priceLTEArr[0] : undefined;
    let priceGTEArr = filtersMap.get(FilterType.PRICE_LOW);
    let priceGTE = priceGTEArr.length > 0 ? priceGTEArr[0] : undefined;
    let sizes = filtersMap.get(FilterType.SIZE);

    let sort: string = undefined;
    if (this.actualSortMethodKey == 'low') sort = 'asc';
    else if (this.actualSortMethodKey == 'high') sort = 'desc';

    this.productService
      .getAllProductsWithFilters(
        name,
        category,
        color,
        priceLTE,
        priceGTE,
        sizes,
        sort
      )
      .subscribe(
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

  changeSortingMethod(sortMethodKey: string) {
    this.actualSortMethodKey = sortMethodKey;
    this.fetchProductsWithFilters(this.getFiltersMap());
  }

  onAddToCartClick(cartProduct: CartProduct, product: Product) {
    this.addToCartClick.emit([cartProduct, product]);
  }

  onProductRowClick(selectedProduct: Product) {
    this.productRowClick.emit(selectedProduct);
  }
}
