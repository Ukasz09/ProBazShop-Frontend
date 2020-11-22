import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart-product-row',
  templateUrl: './cart-product-row.component.html',
  styleUrls: ['./cart-product-row.component.scss'],
})
export class CartProductRowComponent implements OnInit {
  @Input() product: Product;
  @Input() qty = 1;
  @Output() incChosenProductQtyClick = new EventEmitter();
  @Output() decChosenProductQtyClick = new EventEmitter();
  @Output() removeFromCartClick: EventEmitter<Product> = new EventEmitter();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }
}
