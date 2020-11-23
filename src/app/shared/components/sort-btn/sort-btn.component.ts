import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortMethod } from 'src/app/model/sort-method';

@Component({
  selector: 'app-sort-btn',
  templateUrl: './sort-btn.component.html',
  styleUrls: ['./sort-btn.component.scss'],
})
export class SortBtnComponent implements OnInit {
  @Input() sortingMethods: Map<string, SortMethod<any>> = new Map();
  @Input() initSortMethod: SortMethod<any>;
  @Output() sortMethodChange: EventEmitter<
    SortMethod<any>
  > = new EventEmitter();
  actualSortingMethod: SortMethod<any> = undefined;

  get sortingMethodsKeys(): string[] {
    return Array.from(this.sortingMethods.keys());
  }

  constructor() {}

  ngOnInit(): void {
    // let fstSortMethod = this.getFstValueFromSortMethods();
    this.actualSortingMethod = this.initSortMethod;
  }

  // private getFstValueFromSortMethods(): SortMethod<any> | undefined {
  //   if (this.sortingMethods.size > 0)
  //     return this.sortingMethods.values().next().value;
  // }

  getSortingMethod(methodKey: string): SortMethod<any> {
    return this.sortingMethods.get(methodKey);
  }

  changeSortingMethod(methodKey: string) {
    this.actualSortingMethod = this.getSortingMethod(methodKey);
    this.sortMethodChange.emit(this.actualSortingMethod);
  }

  getSortingMethodLabelTxt(methodKey: string): string {
    let labelTxt = this.sortingMethods.get(methodKey).labelText;
    return labelTxt ?? methodKey;
  }
}
