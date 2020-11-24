import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertModel } from 'src/app/model/alert.model';
import { CartProduct } from 'src/app/model/cart-product';
import { Product } from 'src/app/model/product';
import { SortMethod } from 'src/app/model/sort-method';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
 static readonly MAX_STARS_NUMBER = 5;
  readonly availableSortMethods = new Map([
    ['newest', new SortMethod<Product>('From newest')],
    ['low', new SortMethod<Product>('Price: low to high')],
    ['high', new SortMethod<Product>('Price: high to low')],
    ['oldest', new SortMethod<Product>('From oldest')],
  ]);

  @Output() addToCartClick: EventEmitter<
    [CartProduct, Product]
  > = new EventEmitter();
  @Output() productRowClick: EventEmitter<Product> = new EventEmitter();

  initSortMethodKey = 'newest';
  productsDataReady = false;
  itemsPerPage = 5;
  products: Product[] = [];
  productsPerPage: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.productsPerPage = this.products.slice(0, this.itemsPerPage);
      this.productsDataReady = true;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.productsPerPage = this.products.slice(startItem, endItem);
    this.scrollToTopSmothly();
  }

  private scrollToTopSmothly() {
    // window.scroll(0,0);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) window.scrollTo(0, pos - 30);
      // how far to scroll on each step
      else window.clearInterval(scrollToTop);
    }, 16);
  }

  changeSortingMethod(sortMethod: SortMethod<Product>) {
    console.log('Need to apply sort for: ', sortMethod.labelText);
  }

  onAddToCartClick(cartProduct: CartProduct, product: Product) {
    this.addToCartClick.emit([cartProduct, product]);
  }

  onProductRowClick(selectedProduct: Product) {
    this.productRowClick.emit(selectedProduct);
  }

  // onAddToCartClick(cartProduct: CartProduct, product: Product) {
  //   this.modalRef.hide();
  //   let succeed = this.cartService.addProductWithQtyValidation(
  //     cartProduct.id,
  //     cartProduct.qty,
  //     product.availableQty
  //   );
  //   if (succeed) this.showSuccessfulAddToCartAlert();
  //   else this.showUnsuccessfulAddToCartAlert();
  // }

  // private showSuccessfulAddToCartAlert() {
  //   let alertModel = new AlertModel(
  //     ProductsListComponent.SUCCESSFUL_ADD_TO_CART_ALERT_ID,
  //     'success',
  //     'Successful add to cart'
  //   );
  //   this.alertService.addAlert(alertModel);
  // }

  // private showUnsuccessfulAddToCartAlert() {
  //   let alertModel = new AlertModel(
  //     ProductsListComponent.UNSUCCESSFUL_ADD_TO_CART_ALERT_ID,
  //     'custom-danger',
  //     "Don't add - in cart already maximum quantity of this product",
  //     5000
  //   );
  //   this.alertService.addAlert(alertModel);
  // }
}
