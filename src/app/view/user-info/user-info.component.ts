import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() _user: User;

  get user(): User {
    if (this._user == undefined) return this.userService.LoggedUser;
    return this._user;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
