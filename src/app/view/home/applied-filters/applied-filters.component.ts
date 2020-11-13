import { Component, Input, OnInit } from '@angular/core';
import { FilterElem, FilterType } from './filter-model';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss'],
})
export class AppliedFiltersComponent implements OnInit {
  FilterTypes = FilterType;
  @Input() filters: FilterElem[] = [];

  constructor() {}

  ngOnInit(): void {}

  onCloseClick(filter: FilterElem) {
    this.deleteElemFromArr(filter);
  }

  private deleteElemFromArr(elem: FilterElem) {
    const index = this.filters.indexOf(elem, 0);
    if (index > -1) this.filters.splice(index, 1);
  }
}
