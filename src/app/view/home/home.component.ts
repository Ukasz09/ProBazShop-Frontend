import { Component, OnInit } from '@angular/core';
import { NavbarContainerComponent } from '../navbar/navbar-container/navbar-container.component';
import { AlertBase } from '../shared/alert-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AlertBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  get navbarHeightPerc(): number {
    return NavbarContainerComponent.heightPerc;
  }
}
