import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';

@Component({
  selector: 'app-user-info-content',
  templateUrl: './user-info-content.component.html',
  styleUrls: ['./user-info-content.component.scss'],
})
export class UserInfoContentComponent implements OnInit {
  @Input() user: User;
  @Input() withDeleteUpdateBtn = false;

  get AccountTypeString(): string {
    return UserAccountType[this.user.accountType];
  }

  get userDataWasChanged(): boolean {
    return (
      this.user.name != this.getNameControl().value ||
      this.user.surname != this.getSurnameControl().value ||
      this.user.email != this.getEmailControl().value
    );
  }

  confirmModalOptions: ModalOptions = { class: 'modal-sm' };
  modalRef: BsModalRef;
  userForm: FormGroup;

  constructor(
    private alertService: AlertsService,
    private modalService: BsModalService,
    private navbarService: NavbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUserForm();
  }

  onDeleteUserDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getWarningFormAlert(
        FormAlerts.USER_REMOVE_NOT_CONFIRMED_ID,
        'User remove NOT confirmed'
      )
    );
  }

  onDeleteUserConfirm() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getSuccessFormAlert(
        FormAlerts.USER_REMOVE_CONFIRMED_ID,
        'User remove confirmed'
      )
    );
  }

  onUpdateUserDecline() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getWarningFormAlert(
        FormAlerts.USER_UPDATE_NOT_CONFIRMED_ID,
        'User update NOT procedeed'
      )
    );
  }

  onUpdateUserConfirm() {
    this.modalRef.hide();
    this.alertService.addAlert(
      FormAlerts.getSuccessFormAlert(
        FormAlerts.USER_UPDATE_CONFIRMED_ID,
        'User update confirmed'
      )
    );
  }

  onDeleteProductBtnClick(template: TemplateRef<any>) {
    this.openModal(template, this.confirmModalOptions);
  }

  onUpdateUserBtnClick(template: TemplateRef<any>) {
    this.openModal(template, this.confirmModalOptions);
  }

  private openModal(template: TemplateRef<any>, options: ModalOptions) {
    this.modalRef = this.modalService.show(template, options);
  }

  private initUserForm() {
    this.userForm = new FormBuilder().group({
      name: [this.user.name],
      surname: [this.user.surname],
      email: [this.user.email],
    });
  }

  getNameControl(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  getSurnameControl(): FormControl {
    return this.userForm.get('surname') as FormControl;
  }

  getEmailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  private unpatchUserFromForm(): User {
    return new User(
      this.getNameControl().value,
      this.getSurnameControl().value,
      this.getEmailControl().value,
      this.user.password,
      this.user.history,
      this.user.accountType
    );
  }
}
