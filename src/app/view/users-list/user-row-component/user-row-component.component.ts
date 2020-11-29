import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';

@Component({
  selector: 'app-user-row-component',
  templateUrl: './user-row-component.component.html',
  styleUrls: ['./user-row-component.component.scss'],
})
export class UserRowComponentComponent implements OnInit {
  @Input() user: User;
  @Output() rowClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get accountTypeString(): string {
    return UserAccountType[this.user.type];
  }
  
}
