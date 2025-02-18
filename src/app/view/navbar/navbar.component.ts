import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/model/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppAlerts } from 'src/app/shared/app-alerts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  AppComponent = AppComponent;

  isBs3 = isBs3();
  searchedPhrase: string = '';
  searchKeywords: string[] = [];
  products: Product[] = [];

  get userIsLogged(): boolean {
    return this.authService.UserIsLogged;
  }

  get UserHasClientAccountType(): boolean {
    return !this.authService.UserHasAdministrativePrivileges;
  }

  get IsVisible(): boolean {
    return this.navbarService.navbarIsVisible;
  }

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private alertService: AlertsService,
    private navbarService: NavbarService,
    private cartService: CartService,
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
    this.authService.logoutUser();
    this.cartService.clearProductList();
    this.alertService.addAlert(
      AppAlerts.getSuccessAlert(
        AppAlerts.SUCCESSFUL_LOGOFF_ALERT_ID,
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
