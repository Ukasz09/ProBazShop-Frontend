import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertModel } from 'src/app/model/alert.model';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProductItemDetailsComponent } from 'src/app/shared/components/modals/product-item-details/product-item-details.component';
import { NavbarComponent } from 'src/app/view/navbar/navbar.component';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
import { FilterType } from './categories-panel/applied-filters/filter-model';
import { CategoriesPanelComponent } from './categories-panel/categories-panel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  static readonly SUCCESSFUL_ADD_TO_CART_ALERT_ID = 'successful_add_to_cart';
  static readonly UNSUCCESSFUL_ADD_TO_CART_ALERT_ID = 'dont_add_to_cart';

  @ViewChild('categories') categoriesComponent: CategoriesPanelComponent;
  @ViewChild('details') productDetailsTemplate: TemplateRef<any>;
  phraseSuggestionSubscription: Subscription;
  selectedProductSubscription: Subscription;

  deatilsModalOptions: ModalOptions = { class: 'modal-lg' };
  confirmModalOptions: ModalOptions = { class: 'modal-sm' };
  chosenProduct: Product = undefined;
  editedProduct: Product;
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
    private cartService: CartService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscribeNavbarSearchBtnClick();
    this.subscribeNavbarProductSelect();
  }

  ngOnDestroy(): void {
    this.phraseSuggestionSubscription?.unsubscribe();
    this.selectedProductSubscription?.unsubscribe();
    this.clearNavbarBuffers();
  }

  //To avoid consuming already consumed data when switch to new page and then back to the home component
  private clearNavbarBuffers() {
    this.navbarService.phraseSuggestion$.next('');
    this.navbarService.selectedProductFromSuggestion$.next(undefined);
  }

  //TODO: activate after moving filters to service
  private subscribeNavbarSearchBtnClick() {
    // this.phraseSuggestionSubscription = this.navbarService.phraseSuggestion$.subscribe(
    //   {
    //     next: (data: string) => {
    //       if (data) this.onSearchBtnClick(data);
    //     },
    //   }
    // );
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

  private onSearchBtnClick(searchedPhrase: string) {
    //TODO: send request
    this.categoriesComponent.removeFstFilterWithType(FilterType.SEARCH_PHRASE);
    this.categoriesComponent.addFilter(
      searchedPhrase,
      FilterType.SEARCH_PHRASE
    );
  }

  showProductDetails(selectedProduct: Product, template: TemplateRef<any>) {
    this.chosenProduct = selectedProduct;
    this.modalRef?.hide();
    this.openModal(template, this.deatilsModalOptions);
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }

  openModal(template: TemplateRef<any>, options: ModalOptions) {
    this.modalRef = this.modalService.show(template, options);
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

  onUpdateProductDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getWarningFormAlert(
        FormAlerts.PRODUCT_UPDATE_NOT_CONFIRMED_ID,
        'Product update NOT procedeed'
      )
    );
  }

  onUpdateProductConfirm() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getSuccessFormAlert(
        FormAlerts.PRODUCT_UPDATE_CONFIRMED_ID,
        'Product update confirmed'
      )
    );
    console.log(this.editedProduct);
  }

  onDeleteProductBtnClick(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.openModal(template, this.confirmModalOptions);
  }

  onUpdateProductBtnClick(editedProduct: Product, template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.openModal(template, this.confirmModalOptions);
    this.editedProduct = editedProduct;
  }
}
