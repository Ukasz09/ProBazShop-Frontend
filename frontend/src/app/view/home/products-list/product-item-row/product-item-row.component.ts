import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/model/product';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.scss'],
})
export class ProductItemRowComponent implements OnInit {
  @Input() product: Product;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }
}
