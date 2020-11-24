import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModel } from 'src/app/model/alert.model';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(
    private alertService: AlertsService,
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

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
    let alertModel = new AlertModel(
      HomeComponent.SUCCESSFUL_ADD_TO_CART_ALERT_ID,
      'success',
      'Successful add to cart'
    );
    this.alertService.addAlert(alertModel);
  }

  private showUnsuccessfulAddToCartAlert() {
    let alertModel = new AlertModel(
      HomeComponent.UNSUCCESSFUL_ADD_TO_CART_ALERT_ID,
      'custom-danger',
      "Don't add - in cart already maximum quantity of this product",
      5000
    );
    this.alertService.addAlert(alertModel);
  }
}
