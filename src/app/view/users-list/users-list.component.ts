import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, UserAccountType } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from 'src/app/view/navbar/navbar.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userList: User[] = [];
  actualChosenUser: User = undefined;
  httpError: { statusCode: number; msg: string } = undefined;
  usersFetched = false;
  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsersList().subscribe(
      (data: User[]) => {
        this.userList = data;
        this.userList.forEach(
          (u: User) =>
            (u.accountType = UserAccountType[u.accountType.toString()])
        );
        if (this.userList.length > 0) this.actualChosenUser = this.userList[0];
        this.usersFetched = true;
        console.log(this.userList);
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Users data fetching error: ' + e.statusText,
        })
    );
  }
}
