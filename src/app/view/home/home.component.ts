import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModel } from 'src/app/model/alert.model';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  static readonly SUCCESSFUL_ADD_TO_CART_ALERT_ID = 'successful_add_to_cart';
  static readonly UNSUCCESSFUL_ADD_TO_CART_ALERT_ID = 'dont_add_to_cart';
  chosenProduct: Product = undefined;
  modalRef: BsModalRef;

  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

  constructor(
    private alertService: AlertsService,
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }

  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

  showProductDetails(selectedProduct: Product, template: TemplateRef<any>) {
    this.chosenProduct = selectedProduct;
    this.modalRef?.hide();
    this.openModal(template);
  }

  onAddToCartClick(cartProduct: CartProduct, product: Product) {
    this.modalRef?.hide();
    let succeed = this.cartService.addProductWithQtyValidation(
      cartProduct.id,
      cartProduct.qty,
      product.availableQty
    );
    if (succeed) this.showSuccessfulAddToCartAlert();
    else this.showUnsuccessfulAddToCartAlert();
  }

  private showSuccessfulAddToCartAlert() {
    let alertModel = FormAlerts.getSuccessFormAlert(
      HomeComponent.SUCCESSFUL_ADD_TO_CART_ALERT_ID,
      'Successful add to cart'
    );
    this.alertService.addAlert(alertModel);
  }

  private showUnsuccessfulAddToCartAlert() {
    let alertModel = FormAlerts.getDangerFormAlert(
      HomeComponent.UNSUCCESSFUL_ADD_TO_CART_ALERT_ID,
      "Don't add - in cart already maximum quantity of this product"
    );
    this.alertService.addAlert(alertModel);
  }

  onDeleteProductDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getWarningFormAlert(
        FormAlerts.PRODUCT_REMOVE_NOT_CONFIRMED_ID,
        'Product remove NOT confirmed'
      )
    );
  }

  onDeleteProductConfirm() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getSuccessFormAlert(
        FormAlerts.PRODUCT_REMOVE_CONFIRMED_ID,
        'Product remove confirmed'
      )
    );
  }

  onDeleteProductBtnClick(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.openModal(template);
  }
}
