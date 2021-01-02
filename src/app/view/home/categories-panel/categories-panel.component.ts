import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';
import { FilterElem, FilterType } from './applied-filters/filter-model';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit, OnDestroy {
  FilterType = FilterType;

  @Input() productsDataReady = false;
  @Input() priceSliderOptions: Options;
  // @Input() maxProductPrice: number;

  @Output() deleteFilterClick = new EventEmitter();
  @Output() addFilterClick = new EventEmitter();

  priceSliderControl = new FormControl([0, 500]);
  categoriesDataReady = false;
  categories: string[] = [];
  colors: string[] = [
    'FFFFFF',
    'F44336',
    '4CAF50',
    '2196F3',
    'FFC107',
    '212121',
    '795548',
    '9E9E9E',
    'FF4081',
  ];

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  httpError: { statusCode: number; msg: string } = undefined;

  get appliedFilters(): FilterElem[] {
    return this.filterService.appliedFilters;
  }

  constructor(
    private productService: ProductsService,
    private filterService: FilterService
  ) {}

  ngOnDestroy(): void {
    this.filterService.clearFilters();
  }

  ngOnInit(): void {
    this.fetchProductCategories();
  }

  private fetchProductCategories() {
    this.productService.getProductCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
        this.categories.sort();
        this.categoriesDataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Categories loading error: ' + e.statusText,
        })
    );
  }

  private addLowPriceFilter() {
    this.filterService.addFilter(
      this.priceSliderControl.value[0],
      FilterType.PRICE_LOW
    );
  }

  private addHighPriceFilter() {
    this.filterService.addFilter(
      this.priceSliderControl.value[1],
      FilterType.PRICE_HIGH
    );
  }

  onDeleteFilterClick(filter: FilterElem) {
    this.filterService.deleteElemFromFilters(filter);
    if (filter.type == FilterType.PRICE_LOW) {
      let actualHighPriceValue: number = this.priceSliderControl.value[1];
      this.priceSliderControl.reset([
        this.priceSliderOptions.floor,
        actualHighPriceValue,
      ]);
    } else if (filter.type == FilterType.PRICE_HIGH) {
      let actualLowPriceValue: number = this.priceSliderControl.value[0];
      this.priceSliderControl.reset([
        actualLowPriceValue,
        this.priceSliderOptions.ceil,
      ]);
    }
    this.deleteFilterClick.emit();
  }

  updatePriceFilter(sliderChangeValue: ChangeContext) {
    this.filterService.removeFstFilterWithType(FilterType.PRICE_HIGH);
    if (sliderChangeValue.highValue < this.priceSliderOptions.ceil) {
      this.addHighPriceFilter();
    }
    this.filterService.removeFstFilterWithType(FilterType.PRICE_LOW);
    if (sliderChangeValue.value > this.priceSliderOptions.floor) {
      this.addLowPriceFilter();
    }
    this.addFilterClick.emit();
  }

  addFilter(value: string, filterType: FilterType) {
    this.filterService.addFilter(value, filterType);
    this.addFilterClick.emit();
  }
}
