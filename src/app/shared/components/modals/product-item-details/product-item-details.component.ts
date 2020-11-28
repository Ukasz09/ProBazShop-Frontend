import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { UserAccountType } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsListComponent } from 'src/app/view/home/products-list/products-list.component';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit {
  @Input() withAddToCartBtn = true;
  @Input() withStarRating = true;
  @Input() product: Product;

  @Output() addToCartClick: EventEmitter<CartProduct> = new EventEmitter();
  @Output() deleteProductClick: EventEmitter<Product> = new EventEmitter();
  @Output() updateProductClick: EventEmitter<Product> = new EventEmitter();

  productForm: FormGroup;
  modalRef: BsModalRef;
  chosenProductQty = 1;

  get productDataWasChangedByUser(): boolean {
    return (
      this.product.description != this.editableDescriptionControl.value ||
      this.product.name != this.editableNameControl.value ||
      this.product.price != this.editablePriceControl.value
    );
  }

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }

  get needToShowAddToCartBtn(): boolean {
    return (
      this.withAddToCartBtn &&
      this.authService.UserIsLogged &&
      this.authService.LoggedUser.accountType == UserAccountType.CLIENT
    );
  }

  get userHasAdministrativePrivileges(): boolean {
    return this.authService.UserHasAdministrativePrivileges;
  }

  get editableDescriptionControl(): FormControl {
    return this.productForm.get('description') as FormControl;
  }

  get editableNameControl(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get editablePriceControl(): FormControl {
    return this.productForm.get('price') as FormControl;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initEditableProductInfo();
  }

  private initEditableProductInfo() {
    this.productForm = new FormBuilder().group({
      description: [this.product.description],
      name: [this.product.name],
      price: [this.product.price],
    });
  }

  decQtyClick() {
    this.chosenProductQty--;
    if (this.chosenProductQty < 1) this.chosenProductQty = 1;
  }

  incQtyClick() {
    this.chosenProductQty++;
    if (this.chosenProductQty > this.product.availableQty)
      this.chosenProductQty = this.product.availableQty;
  }

  onAddToCartClick() {
    let cartProduct = new CartProduct(this.product.id, this.chosenProductQty);
    this.addToCartClick.emit(cartProduct);
  }

  onDeleteProductBtnClick() {
    this.deleteProductClick.emit(this.product);
  }

  onUpdateProductBtnClick() {
    let editedProduct = this.unpatchProductFromForm();
    this.updateProductClick.emit(editedProduct);
  }

  private unpatchProductFromForm(): Product {
    return new Product(
      this.product.id,
      this.productForm.get('name').value,
      this.productForm.get('description').value,
      this.product.imageURL,
      this.product.size,
      this.product.color,
      this.productForm.get('price').value as number,
      this.product.createdAt,
      this.product.starRating,
      this.product.availableQty,
      this.product.category
    );
  }
}
