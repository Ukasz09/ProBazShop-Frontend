import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModel } from 'src/app/model/alert.model';
import { RegistrationFormModel } from 'src/app/model/form/registration-form.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
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

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

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
      this.userService.postUser(undefined);
      this.registrationIsDone = true;
      this.alertService.removeAlertWithId(FormAlerts.INVALID_DATA_ALERT_ID);
      this.alertService.addAlert(
        FormAlerts.getSuccessFormAlert(
          FormAlerts.SUCCESSFUL_REGISTRATION_ALERT_ID,
          'Successful account registration'
        )
      );
    } else {
      this.alertService.addAlert(
        FormAlerts.getDangerFormAlert(
          FormAlerts.INVALID_DATA_ALERT_ID,
          'Invalid data in form'
        )
      );
    }
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
}
