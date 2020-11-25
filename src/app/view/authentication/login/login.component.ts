import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from 'src/app/model/form/login-form.model';
import { User, UserAccountType } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormLogicUtils } from 'src/app/shared/forms/form-logic-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formDataModel: LoginFormModel;
  loginForm: FormGroup;
  needToShowInvalidFormAlert = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.formDataModel = new LoginFormModel();
    this.loginForm = FormLogicUtils.makeFormFromModel(this.formDataModel);
  }

  //TODO: tmp mocked
  onLoginBtnClick() {
    this.userService.logonUser(this.mockUser);
    this.router.navigateByUrl('/home');
  }

  onBackBtnClick() {
    this.router.navigateByUrl('/authentication-choice');
  }

  //TODO: mocked
  mockUser = new User(
    'Łukasz',
    'Gajerski',
    'gajerski.lukasz@gmail.com',
    'password1234',
    [],
    UserAccountType.CLIENT
  );
}
