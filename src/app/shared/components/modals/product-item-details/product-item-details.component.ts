import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { UserAccountType } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
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

  modalRef: BsModalRef;

  get maxStars(): number {
    return ProductsListComponent.MAX_STARS_NUMBER;
  }

  get needToShowAddToCartBtn(): boolean {
    return (
      this.withAddToCartBtn &&
      this.userService.UserIsLogged &&
      this.userService.LoggedUser.accountType == UserAccountType.CLIENT
    );
  }

  get userHasAdministrativePrivileges(): boolean {
    return (
      this.userService.UserIsLogged &&
      this.userService.LoggedUser.accountType == UserAccountType.EMPLOYEE
    );
  }

  chosenProductQty = 1;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

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
    this.deleteProductClick.emit(this.product)
  }
}
