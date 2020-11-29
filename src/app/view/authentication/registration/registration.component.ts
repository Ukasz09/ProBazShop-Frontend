import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegistrationFormModel } from 'src/app/model/form/registration-form.model';
import { OrderedProduct } from 'src/app/model/ordered-product';
import { User } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { AppAlerts } from 'src/app/shared/app-alerts';
import { FormLogicUtils } from 'src/app/shared/forms/form-logic-utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  formDataModel: RegistrationFormModel;
  registrationIsDone: boolean;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private alertService: AlertsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formDataModel = new RegistrationFormModel();
    this.registrationForm = FormLogicUtils.makeFormFromModel(
      this.formDataModel
    );
    this.registrationIsDone = false;
  }

  onRegisterBtnClick() {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      if (this.passwordAreEquals()) this.registerUser();
      else {
        this.alertService.addAlert(
          AppAlerts.getDangerFormAlert(
            AppAlerts.INVALID_DATA_ALERT_ID,
            'Passwords are not the same'
          )
        );
      }
    } else {
      this.alertService.addAlert(
        AppAlerts.getDangerFormAlert(
          AppAlerts.INVALID_DATA_ALERT_ID,
          'Invalid data in form'
        )
      );
    }
  }

  private passwordAreEquals(): boolean {
    let password1 = this.passwordFormControl.value;
    let password2 = this.confirmPasswordFormControl.value;
    return password1 == password2;
  }

  registerUser() {
    let newUserData = this.unpatchUserFromForm();
    this.userService.postUser(newUserData).subscribe(
      (_) => this.onCorrectRegisterUserResponse(),
      (err: HttpErrorResponse) => console.log(err)
    );
  }

  private onCorrectRegisterUserResponse() {
    this.registrationIsDone = true;
    this.alertService.removeAlertWithId(AppAlerts.INVALID_DATA_ALERT_ID);
    let alertModel = AppAlerts.getSuccessAlert(
      AppAlerts.SUCCESSFUL_REGISTRATION_ALERT_ID,
      'Successful account registration'
    );
    this.alertService.addAlert(alertModel);
  }

  onBackBtnClick(template: TemplateRef<any>) {
    if (this.registrationForm.dirty) this.openModal(template);
    else this.backConfirmAction();
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onBackDecline() {
    this.modalRef.hide();
  }

  onBackConfirm() {
    this.modalRef.hide();
    this.backConfirmAction();
  }

  private backConfirmAction() {
    this.router.navigateByUrl('/authentication-choice');
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }

  private unpatchUserFromForm(): User {
    let name = this.nameFormControl.value;
    let surname = this.surnameFormControl.value;
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    let history: OrderedProduct[] = [];
    let type = 'CLIENT';
    let user = new User(
      undefined,
      name,
      surname,
      email,
      password,
      history,
      type
    );
    return user;
  }

  /* --------------------------------------------------------------------------------------------------- */
  get nameFormControl(): FormControl {
    return this.registrationForm.get('name') as FormControl;
  }

  get surnameFormControl(): FormControl {
    return this.registrationForm.get('surname') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
}
