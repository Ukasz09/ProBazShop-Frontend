import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent implements OnInit {
  AppComponent = AppComponent;

  constructor() {}

  ngOnInit(): void {}

  get navbarHeightPerc(): number {
    return NavbarComponent.navbarHeightPerc;
  }

  onRegisterClick() {
    AppComponent.logonUser();
  }
}
