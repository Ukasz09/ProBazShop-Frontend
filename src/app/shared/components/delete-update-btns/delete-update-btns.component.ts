import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-delete-update-btns',
  templateUrl: './delete-update-btns.component.html',
  styleUrls: ['./delete-update-btns.component.scss'],
})
export class DeleteUpdateBtnsComponent implements OnInit {
  @Input() updateBTnDisabled = false;
  @Input() btnUpdateText = 'Update';
  @Input() btnDeleteText = 'Delete';
  @Output() deleteClick = new EventEmitter();
  @Output() updateClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDeleteProductBtnClick() {
    this.deleteClick.emit();
  }

  onUpdateProductBtnClick() {
    this.updateClick.emit();
  }
}
