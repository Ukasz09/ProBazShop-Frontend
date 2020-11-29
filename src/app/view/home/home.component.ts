import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppAlerts } from 'src/app/shared/app-alerts';
import { ProductItemDetailsComponent } from 'src/app/shared/components/modals/product-item-details/product-item-details.component';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  static readonly SUCCESSFUL_ADD_TO_CART_ALERT_ID = 'successful_add_to_cart';
  static readonly UNSUCCESSFUL_ADD_TO_CART_ALERT_ID = 'dont_add_to_cart';

  @ViewChild('details') productDetailsTemplate: TemplateRef<any>;
  @ViewChild('productList') productListComponent: ProductsListComponent;

  selectedProductSubscription: Subscription;

  lastUpdatedProductFormData: Product = undefined;
  markedToDeleteProductId: string = undefined;
  deatilsModalOptions: ModalOptions = { class: 'modal-lg' };
  confirmModalOptions: ModalOptions = { class: 'modal-sm' };
  chosenProduct: Product = undefined;
  editedProduct: Product;
  modalRef: BsModalRef;

  constructor(
    private alertService: AlertsService,
    private modalService: BsModalService,
    private cartService: CartService,
    private productService: ProductsService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscribeNavbarProductSelect();
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription?.unsubscribe();
    this.clearNavbarBuffers();
  }

  //To avoid consuming already consumed data when switch to new page and then back to the home component
  private clearNavbarBuffers() {
    this.navbarService.phraseSuggestion$.next('');
    this.navbarService.selectedProductFromSuggestion$.next(undefined);
  }

  private subscribeNavbarProductSelect() {
    this.selectedProductSubscription = this.navbarService.selectedProductFromSuggestion$.subscribe(
      {
        next: (data: Product) => {
          if (data) this.showProductDetails(data, this.productDetailsTemplate);
        },
      }
    );
  }

  showProductDetails(selectedProduct: Product, template: TemplateRef<any>) {
    this.chosenProduct = selectedProduct;
    this.modalRef?.hide();
    this.openModal(template, this.deatilsModalOptions);
  }

  openModal(template: TemplateRef<any>, options: ModalOptions) {
    this.modalRef = this.modalService.show(template, options);
  }

  onAddToCartClick(cartProduct: CartProduct, product: Product) {
    this.modalRef?.hide();
    let succeed = this.cartService.addProductWithQtyValidation(
      cartProduct.product,
      cartProduct.qty,
      product.availableQty
    );
    if (succeed) this.showSuccessfulAddToCartAlert();
    else this.showUnsuccessfulAddToCartAlert();
  }

  private showSuccessfulAddToCartAlert() {
    let alertModel = AppAlerts.getSuccessAlert(
      HomeComponent.SUCCESSFUL_ADD_TO_CART_ALERT_ID,
      'Successful add to cart'
    );
    this.alertService.addAlert(alertModel);
  }

  private showUnsuccessfulAddToCartAlert() {
    let alertModel = AppAlerts.getDangerFormAlert(
      HomeComponent.UNSUCCESSFUL_ADD_TO_CART_ALERT_ID,
      "Don't add - in cart already maximum quantity of this product"
    );
    this.alertService.addAlert(alertModel);
  }

  onDeleteProductDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      AppAlerts.getWarningFormAlert(
        AppAlerts.PRODUCT_REMOVE_NOT_CONFIRMED_ID,
        'Product remove NOT confirmed'
      )
    );
  }

  onDeleteProductConfirm() {
    this.modalRef.hide();
    this.productService.deleteProduct(this.markedToDeleteProductId).subscribe(
      (response) => {
        this.onCorrectResponse(
          AppAlerts.PRODUCT_DELETE_SUCCESSFUL,
          response?.message
        );
      },
      (err: HttpErrorResponse) => {
        let alertMsg =
          err.status + ': ' + err.statusText + ' - ' + err.error.message;
        this.onErrorResponse(AppAlerts.PRODUCT_DELETE_ERROR, alertMsg);
      }
    );
    this.markedToDeleteProductId = undefined;
  }

  onUpdateProductDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      AppAlerts.getWarningFormAlert(
        AppAlerts.PRODUCT_UPDATE_NOT_CONFIRMED_ID,
        'Product update NOT procedeed'
      )
    );
  }

  onUpdateProductConfirm() {
    this.modalRef.hide();
    this.productService
      .updateProduct(this.lastUpdatedProductFormData)
      .subscribe(
        (response) => {
          console.log('correct-up');
          this.onCorrectResponse(
            AppAlerts.PRODUCT_UPDATE_SUCCESSFUL,
            response.message
          );
        },
        (err: HttpErrorResponse) => {
          let alertMsg =
            err.status + ': ' + err.statusText + ' - ' + err.error.message;
          this.onErrorResponse(AppAlerts.PRODUCT_UPDATE_ERROR, alertMsg);
        }
      );

    this.lastUpdatedProductFormData = undefined;
  }

  private onCorrectResponse(alertId: string, alertMsg: string) {
    this.alertService.addAlert(AppAlerts.getSuccessAlert(alertId, alertMsg));
    let filters = this.productListComponent.getFiltersMap();
    this.productListComponent.fetchProductsWithFilters(filters);
  }

  private onErrorResponse(alertId: string, alertMsg: string) {
    this.alertService.addAlert(AppAlerts.getDangerFormAlert(alertId, alertMsg));
  }

  onDeleteProductBtnClick(product: Product, template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.openModal(template, this.confirmModalOptions);
    this.markedToDeleteProductId = product.id;
  }

  onUpdateProductBtnClick(updatedProduct: Product, template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.lastUpdatedProductFormData = updatedProduct;
    this.openModal(template, this.confirmModalOptions);
  }
}
