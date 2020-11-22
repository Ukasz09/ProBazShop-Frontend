import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModel } from 'src/app/model/alert.model';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsListComponent } from '../products-list.component';

@Component({
  selector: 'app-product-item-row',
  templateUrl: './product-item-row.component.html',
  styleUrls: ['./product-item-row.component.scss'],
})
export class ProductItemRowComponent implements OnInit {
  static readonly SUCCESSFUL_ADD_TO_CART_ALERT_ID = 'successful_add_to_cart';
  static readonly UNSUCCESSFUL_ADD_TO_CART_ALERT_ID = 'dont_add_to_cart';
  @Input() product: Product;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private cartService: CartService,
    private alertService: AlertsService
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
    if (succeed) {
      let alertModel = new AlertModel(
        ProductItemRowComponent.SUCCESSFUL_ADD_TO_CART_ALERT_ID,
        'success',
        'Successful add to cart'
      );
      this.alertService.addAlert(alertModel);
    } else {
      let alertModel = new AlertModel(
        ProductItemRowComponent.UNSUCCESSFUL_ADD_TO_CART_ALERT_ID,
        'custom-danger',
        "Don't add - in cart already maximum quantity of this product",
        5000
      );
      this.alertService.addAlert(alertModel);
    }
  }
}
