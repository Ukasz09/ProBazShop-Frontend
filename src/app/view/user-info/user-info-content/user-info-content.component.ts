import { Component, Input, OnInit } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';

@Component({
  selector: 'app-user-info-content',
  templateUrl: './user-info-content.component.html',
  styleUrls: ['./user-info-content.component.scss'],
})
export class UserInfoContentComponent implements OnInit {
  @Input() user: User;

  get AccountTypeString(): string {
    return UserAccountType[this.user.accountType];
  }
  
  constructor() {}

  ngOnInit(): void {}
}
