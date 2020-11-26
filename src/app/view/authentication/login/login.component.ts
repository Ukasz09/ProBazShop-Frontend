import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModel } from 'src/app/model/alert.model';
import { LoginFormModel } from 'src/app/model/form/login-form.model';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
import { FormLogicUtils } from 'src/app/shared/forms/form-logic-utils';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formDataModel: LoginFormModel;
  loginForm: FormGroup;

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

  constructor(
    private router: Router,
    private userService: UserService,
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
      this.userService.logonUser(this.mockUser);
      this.alertService.removeAlertWithId(FormAlerts.INVALID_DATA_ALERT_ID);
      this.alertService.addAlert(
        FormAlerts.getSuccessFormAlert(
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
