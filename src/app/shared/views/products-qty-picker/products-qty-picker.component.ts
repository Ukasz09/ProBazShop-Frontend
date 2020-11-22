import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-qty-picker',
  templateUrl: './products-qty-picker.component.html',
  styleUrls: ['./products-qty-picker.component.scss'],
})
export class ProductsQtyPickerComponent implements OnInit {
  @Input() availableQty: number = 0;
  @Input() chosenProductQty: number = 1;
  @Output() decBtnClick = new EventEmitter();
  @Output() incBtnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  decQtyClick() {
    this.decBtnClick.emit();
  }

  incQtyClick() {
    this.incBtnClick.emit();
  }

  get minusBtnDisabled(): boolean {
    return this.chosenProductQty <= 1 ? true : false;
  }

  get plusBtnDisabled(): boolean {
    return this.chosenProductQty >= this.availableQty ? true : false;
  }
}
