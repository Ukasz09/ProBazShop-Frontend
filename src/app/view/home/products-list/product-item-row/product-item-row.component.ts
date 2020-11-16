import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.scss'],
})
export class ProductItemRowComponent implements OnInit {
  @Input() product: Product;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }

  onAddToCartClick(cartProduct: CartProduct) {
    this.modalRef.hide();
    let succeed = this.cartService.addProductWithQtyValidation(
      cartProduct.id,
      cartProduct.qty,
      this.product.availableQty
    );
    console.log('CART:', this.cartService.productsInCart);
    if (succeed) {
      //TODO: show modal
      console.log('succeed');
    } else {
      console.log('not add');
      //TODO: show modal
    }
  }
}
