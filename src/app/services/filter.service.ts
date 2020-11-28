import { Injectable } from '@angular/core';
import {
  FilterElem,
  FilterType,
} from '../view/home/categories-panel/applied-filters/filter-model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  appliedFilters: FilterElem[] = [];

  constructor() {}

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

  removeFstFilterWithType(filterType: FilterType) {
    let filter = this.appliedFilters.find(
      (filter: FilterElem) => filter.type == filterType
    );
    if (filter !== undefined) this.deleteElemFromFilters(filter);
  }

  deleteElemFromFilters(filter: FilterElem) {
    const index = this.appliedFilters.indexOf(filter, 0);
    if (index > -1) this.appliedFilters.splice(index, 1);
  }
}
