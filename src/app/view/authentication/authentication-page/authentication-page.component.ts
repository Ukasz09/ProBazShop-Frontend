import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent implements OnInit, OnDestroy {
  AppComponent = AppComponent;
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.navbarIsVisible = false;
  }

  ngOnDestroy(): void {
    this.navbarService.navbarIsVisible = true;
  }
}
