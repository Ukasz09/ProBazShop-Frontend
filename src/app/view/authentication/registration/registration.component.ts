import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegistrationFormModel } from 'src/app/model/form/registration-form.model';
import { AlertBase } from '../../shared/alert-base';
import { FormAlerts } from '../../shared/forms/form-alerts';
import { FormLogicUtils } from '../../shared/forms/form-logic-utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends AlertBase implements OnInit {
  registrationForm: FormGroup;
  formDataModel: RegistrationFormModel;

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.formDataModel = new RegistrationFormModel();
    this.registrationForm = FormLogicUtils.makeFormFromModel(
      this.formDataModel
    );
  }

  onRegisterBtnClick() {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      AppComponent.registerUser();
      this.router.navigateByUrl('/home');
    } else {
      this.clearAllAlerts();
      this.addAlert(FormAlerts.getInvalidDataInFormAlert());
    }
  }

  onBackBtnClick() {
    this.router.navigateByUrl('/authentication-choice');
  }
}
