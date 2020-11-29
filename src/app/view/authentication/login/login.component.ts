import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from 'src/app/model/form/login-form.model';
import { User } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppAlerts } from 'src/app/shared/app-alerts';
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
      let emailFromForm = this.loginForm.get('email').value;
      let passwordFromForm = this.loginForm.get('password').value;
      this.logonUser(emailFromForm, passwordFromForm);
    } else {
      this.alertService.addAlert(
        AppAlerts.getDangerFormAlert(
          AppAlerts.INVALID_DATA_ALERT_ID,
          'Fullfill login data'
        )
      );
    }
  }

  private logonUser(emailFromForm: string, passwordFromForm: string) {
    this.authService.logonUser(emailFromForm, passwordFromForm).subscribe(
      (userData: User) => {
        let user = new User(
          userData.id,
          userData.name,
          userData.surname,
          userData.email,
          userData.password,
          userData.history,
          userData.type
        );
        this.authService.setLoggedUser(user);
        this.alertService.removeAlertWithId(AppAlerts.INVALID_DATA_ALERT_ID);
        this.alertService.addAlert(
          AppAlerts.getSuccessAlert(
            AppAlerts.SUCCESSFUL_LOGON_ALERT_ID,
            'Successful logon'
          )
        );
        this.router.navigateByUrl('/home');
      },
      (err: HttpErrorResponse) => {
        this.onIncorrectLogonDataResponse(err);
      }
    );
  }

  private onIncorrectLogonDataResponse(error: HttpErrorResponse) {
    console.log(error);
    this.alertService.addAlert(
      AppAlerts.getDangerFormAlert(
        AppAlerts.INVALID_DATA_ALERT_ID,
        error.status + ': ' + error.statusText + ' - ' + error.error.message
      )
    );
  }

  onBackBtnClick() {
    this.router.navigateByUrl('/authentication-choice');
  }
}
