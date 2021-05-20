import { Injectable } from '@angular/core';
import { FilterElem, FilterType } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  appliedFilters: FilterElem[] = [];

  constructor() {}

  public addFilter(value: string, filterType: FilterType): void {
    const filterExist =
      this.appliedFilters.find(
        (filter: FilterElem) =>
          filter.value === value && filter.type === filterType
      ) !== undefined;
    if (!filterExist) {
      const filter = new FilterElem(value, filterType);
      this.appliedFilters.push(filter);
    }
  }

  public removeFilter(value: string, filterType: FilterType): void {
    this.appliedFilters.filter(
      (f: FilterElem) => f.type !== filterType && f.value !== value
    );
  }

  public removeAllFiltersWithType(filterType: FilterType): void {
    this.appliedFilters.filter((f: FilterElem) => f.type !== filterType);
  }

  public clearFilters(): void {
    this.appliedFilters = [];
  }
}
