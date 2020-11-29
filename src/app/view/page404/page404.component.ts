import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit, OnDestroy {
  errorCode="404";
  errorText="Page not found";

  constructor(private navbarService: NavbarService) { }

  
  ngOnInit(): void {
    this.navbarService.navbarIsVisible = false;
  }

  ngOnDestroy(): void {
    this.navbarService.navbarIsVisible = true;
  }

}
