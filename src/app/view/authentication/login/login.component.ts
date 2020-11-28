import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from 'src/app/model/form/login-form.model';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
import { FormLogicUtils } from 'src/app/shared/forms/form-logic-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formDataModel: LoginFormModel;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.formDataModel = new LoginFormModel();
    this.loginForm = FormLogicUtils.makeFormFromModel(this.formDataModel);
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }

  //TODO: tmp mocked
  onLoginBtnClick() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.logonUser(this.mockUser);
      this.alertService.removeAlertWithId(FormAlerts.INVALID_DATA_ALERT_ID);
      this.alertService.addAlert(
        FormAlerts.getSuccessAlert(
          FormAlerts.SUCCESSFUL_LOGON_ALERT_ID,
          'Successful logon'
        )
      );
      this.router.navigateByUrl('/home');
    } else {
      this.alertService.addAlert(
        FormAlerts.getDangerFormAlert(
          FormAlerts.INVALID_DATA_ALERT_ID,
          'Fullfill login data'
        )
      );
    }
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
