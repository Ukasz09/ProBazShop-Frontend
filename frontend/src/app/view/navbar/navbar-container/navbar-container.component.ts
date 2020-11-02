import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-container',
  templateUrl: './navbar-container.component.html',
  styleUrls: ['./navbar-container.component.scss'],
})
export class NavbarContainerComponent implements OnInit {
  static readonly heightPerc: number = 12;

  constructor() {}

  ngOnInit(): void {}

  get navbarHeightPerc(): number {
    return NavbarContainerComponent.heightPerc;
  }
}
