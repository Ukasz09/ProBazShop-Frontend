import { Component, OnInit } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  get user(): User {
    return this.userService.LoggedUser;
  }

  get AccountTypeString(): string {
    return UserAccountType[this.user.accountType];
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
