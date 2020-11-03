import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginFormModel } from 'src/app/model/form/login-form.model';
import { FormLogicUtils } from '../../shared/forms/form-logic-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formDataModel: LoginFormModel;
  loginForm: FormGroup;
  needToShowInvalidFormAlert = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formDataModel = new LoginFormModel();
    this.loginForm = FormLogicUtils.makeFormFromModel(this.formDataModel);
  }

  //TODO: tmp mocked
  onLoginBtnClick() {
    AppComponent.logonUser();
    this.router.navigateByUrl('/home');
  }

  onBackBtnClick() {
    this.router.navigateByUrl('/authentication-choice');
  }
}
