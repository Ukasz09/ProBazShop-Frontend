import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterElem, FilterType } from './filter-model';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss'],
})
export class AppliedFiltersComponent implements OnInit {
  FilterTypes = FilterType;
  @Input() filters: FilterElem[] = [];
  @Output() deleteElementClick: EventEmitter<FilterElem> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCloseClick(filter: FilterElem) {
    this.deleteElementClick.emit(filter);
  }
}
