import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.scss'],
})
export class ErrorResponseComponent implements OnInit {
  @Input() errorCode: string;
  @Input() errorText: string;
  @Input() errorTextFontSize: string = '1.4em';
  @Input() errorCodeFontSize: string = '5em';

  constructor() {}

  ngOnInit(): void {}
}
