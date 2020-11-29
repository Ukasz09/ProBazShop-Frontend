import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.scss'],
})
export class ErrorResponseComponent  {
  @Input() errorCode: string;
  @Input() errorText: string;
  @Input() errorTextFontSize: string = '1.4em';
  @Input() errorCodeFontSize: string = '5em';

  constructor(private navbarService: NavbarService) {}

  // ngOnInit(): void {
  //   this.navbarService.navbarIsVisible = false;
  // }

  // ngOnDestroy(): void {
  //   this.navbarService.navbarIsVisible = true;
  // }
}
