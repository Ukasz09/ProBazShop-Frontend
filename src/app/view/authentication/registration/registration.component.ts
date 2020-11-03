import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { RegistrationFormModel } from 'src/app/model/form/registration-form.model';
import { AlertBase } from '../../shared/alert-base';
import { FormAlerts } from '../../shared/forms/form-alerts';
import { FormLogicUtils } from '../../shared/forms/form-logic-utils';
import { ModalBase } from '../../shared/modals/modal-base';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends AlertBase implements OnInit {
  registrationForm: FormGroup;
  formDataModel: RegistrationFormModel;
  registrationIsDone: boolean;
  modalBase: ModalBase;
  modalRef: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.formDataModel = new RegistrationFormModel();
    this.registrationForm = FormLogicUtils.makeFormFromModel(
      this.formDataModel
    );
    this.registrationIsDone = false;
  }

  onRegisterBtnClick() {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      AppComponent.registerUser();
      this.registrationIsDone = true;
      this.clearAllAlerts();
      this.addAlert(
        FormAlerts.getSuccessFormAlert('Successful account registration')
      );
    } else {
      this.clearAllAlerts();
      this.addAlert(FormAlerts.getInvalidDataInFormAlert());
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
}
