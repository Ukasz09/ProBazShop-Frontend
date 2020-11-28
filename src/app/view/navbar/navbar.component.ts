import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavbarService } from 'src/app/services/navbar.service';
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

  get UserHasClientAccountType(): boolean {
    return !this.userService.UserHasAdministrativePrivileges;
  }

  get IsVisible(): boolean {
    return this.navbarService.navbarIsVisible;
  }

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private alertService: AlertsService,
    private navbarService: NavbarService,
    private router: Router
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
    this.router.navigateByUrl('/home');
    this.navbarService.addSelectedProductFromSuggestion(selectedProduct);
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
    if (this.searchedPhrase && this.searchedPhrase.trim()) {
      this.router.navigateByUrl('/home');
      this.navbarService.addPhraseSuggestion(this.searchedPhrase);
      this.searchedPhrase = '';
    }
  }
}
