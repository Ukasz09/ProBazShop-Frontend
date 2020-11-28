import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User, UserAccountType } from 'src/app/model/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { ValidationService } from 'src/app/services/validation.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';

@Component({
  selector: 'app-user-info-content',
  templateUrl: './user-info-content.component.html',
  styleUrls: ['./user-info-content.component.scss'],
})
export class UserInfoContentComponent implements OnInit {
  @Input() user: User;
  @Input() withDeleteBtn = false;
  @Input() withUpdateBtn = false;

  @Output() deleteConfirmed = new EventEmitter();
  @Output() updateConfirmed: EventEmitter<User> = new EventEmitter();

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
    private modalService: BsModalService
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
    this.deleteConfirmed.emit();
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
    let upadatedUser = this.unpatchUserFromForm();
    this.modalRef.hide();
    this.updateConfirmed.emit(upadatedUser);
  }

  openConfirmModal(template: TemplateRef<any>) {
    this.openModal(template, this.confirmModalOptions);
  }

  private openModal(template: TemplateRef<any>, options: ModalOptions) {
    this.modalRef = this.modalService.show(template, options);
  }

  private initUserForm() {
    this.userForm = new FormBuilder().group({
      name: [
        {
          value: this.user.name,
          disabled: !this.withUpdateBtn,
        },
        [Validators.required, ValidationService.nameValidator],
      ],
      surname: [
        {
          value: this.user.surname,
          disabled: !this.withUpdateBtn,
        },
        [Validators.required, ValidationService.surnameValidator],
      ],
      email: [
        {
          value: this.user.email,
          disabled: !this.withUpdateBtn,
        },
        [Validators.required, ValidationService.emailValidator],
      ],
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
