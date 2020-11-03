import { Component, OnInit } from '@angular/core';
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
}
