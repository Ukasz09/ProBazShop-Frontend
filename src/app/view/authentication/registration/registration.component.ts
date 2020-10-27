import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegistrationFormModel } from 'src/app/model/form/registration-form.model';
import { FormLogicUtils } from '../../shared/forms/form-logic-utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  formDataModel: RegistrationFormModel;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formDataModel = new RegistrationFormModel();
    this.registrationForm = FormLogicUtils.makeFormFromModel(
      this.formDataModel
    );
  }

  //TODO: tmp mocked
  onRegisterBtnClick() {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      AppComponent.registerUser();
      this.router.navigateByUrl('/home');
    } else alert(`Data in form invalid`);
  }

  onBackBtnClick() {
    this.router.navigateByUrl('/authentication-choice');
  }
}
