import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  static readonly NAVBAR_HEIGHT_PX = 120;
  AppComponent = AppComponent;

  @Output() suggestionSelect: EventEmitter<Product> = new EventEmitter();
  @Output() searchBtnClick: EventEmitter<string> = new EventEmitter();

  isBs3 = isBs3();
  searchedPhrase: string = '';
  searchKeywords: string[] = [];
  products: Product[] = [];

  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  get userIsLogged(): boolean {
    return this.userService.UserIsLogged;
  }

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  private fetchAllProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  onSuggestionSelect(selectedProduct: Product) {
    this.searchedPhrase = '';
    this.suggestionSelect.emit(selectedProduct);
  }

  logoutUser() {
    this.userService.logoutUser();
    this.alertService.addAlert(
      FormAlerts.getSuccessFormAlert(
        FormAlerts.SUCCESSFUL_LOGOFF_ALERT_ID,
        'Successful log off'
      )
    );
  }

  onSearchClick() {
    this.searchBtnClick.emit(this.searchedPhrase);
    this.searchedPhrase = '';
  }
}
