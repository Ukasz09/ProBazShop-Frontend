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
import { environment } from 'src/environments/environment';
import { UserEndpoints } from 'src/app/data/UserEndpoints';
import { MessageHttpResponse } from 'src/app/model/message-response';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.authService.logout().subscribe({
      next: (response: MessageHttpResponse) => {
        this.cartService.clearProductList();
        this.alertService.addAlert(
          AppAlerts.getSuccessAlert(
            AppAlerts.SUCCESSFUL_LOGOFF_ALERT_ID,
            response.message
          )
        );
      },
      error: () => {
        this.alertService.addAlert(
          AppAlerts.getDangerAlert('logout-error', 'Logging out failed')
        );
      },
    });
  }

  onSearchClick() {
    if (this.searchedPhrase && this.searchedPhrase.trim()) {
      this.router.navigateByUrl('/home');
      this.navbarService.addPhraseSuggestion(this.searchedPhrase);
      this.searchedPhrase = '';
    }
  }

  redirectToFacebookAuth() {
    const facebookAuthEndpoint = `${environment.API_URL}${UserEndpoints.LOGIN_URI}`;
    window.location.href = facebookAuthEndpoint;
  }
}
