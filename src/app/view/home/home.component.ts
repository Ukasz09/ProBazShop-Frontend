import { Component, OnInit } from '@angular/core';
import { NavbarContainerComponent } from '../navbar/navbar-container/navbar-container.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get navbarHeightPerc(): number {
    return NavbarContainerComponent.heightPerc;
  }
}
