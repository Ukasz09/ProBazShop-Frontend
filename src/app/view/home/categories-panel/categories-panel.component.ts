import {
  ChangeContext,
  Options,
} from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { FilterElem, FilterType } from '../applied-filters/filter-model';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit {
  FilterType = FilterType;
  priceSliderControl = new FormControl([0, 500]);
  priceSliderOptions: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    },
  };
  categories: string[] = [];
  colors: string[] = [
    '#FFFFFF',
    '#F44336',
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#212121',
    '#795548',
    '#9E9E9E',
  ];
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  appliedFilters: FilterElem[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((data: string[]) => {
      this.categories = data;
      this.categories.sort();
    });
  }

  addFilter(value: string, filterType: FilterType) {
    let theSameFilter = this.appliedFilters.find(
      (filter: FilterElem) => filter.value == value && filter.type == filterType
    );
    let foundInFilters = theSameFilter != undefined;
    if (!foundInFilters) {
      let filter = new FilterElem(value, filterType);
      this.appliedFilters.push(filter);
    }
  }

  private addLowPriceFilter() {
    this.addFilter(
      '>' + ' $' + this.priceSliderControl.value[0],
      FilterType.PRICE_LOW
    );
  }

  private addHighPriceFilter() {
    this.addFilter(
      '<' + ' $' + this.priceSliderControl.value[1],
      FilterType.PRICE_HIGH
    );
  }

  private removeFstFilterWithType(filterType: FilterType) {
    let filter = this.appliedFilters.find(
      (filter: FilterElem) => filter.type == filterType
    );
    if (filter !== undefined) this.deleteElemFromFilters(filter);
  }

  onDeleteFilterClick(filter: FilterElem) {
    this.deleteElemFromFilters(filter);
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
  }

  private deleteElemFromFilters(filter: FilterElem) {
    const index = this.appliedFilters.indexOf(filter, 0);
    if (index > -1) this.appliedFilters.splice(index, 1);
  }

  updatePriceFilter(sliderChangeValue: ChangeContext) {
    this.removeFstFilterWithType(FilterType.PRICE_HIGH);
    if (sliderChangeValue.highValue < this.priceSliderOptions.ceil) {
      this.addHighPriceFilter();
    }
    this.removeFstFilterWithType(FilterType.PRICE_LOW);
    if (sliderChangeValue.value > this.priceSliderOptions.floor) {
      this.addLowPriceFilter();
    }
  }
}
