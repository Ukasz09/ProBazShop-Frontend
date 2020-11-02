import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { FormModel, FormProperty } from './form-model';

export class RegistrationFormModel extends FormModel {
  constructor(
    public name: FormProperty = {
      name: 'Name',
      type: 'text',
      validators: [
        Validators.required,
        Validators.minLength(3),
        ValidationService.nameValidator,
      ],
      defaultValue: '',
    },
    public surname: FormProperty = {
      name: 'Surname',
      type: 'text',
      validators: [
        Validators.required,
        Validators.minLength(2),
        ValidationService.surnameValidator,
      ],
      defaultValue: '',
    },
    public email: FormProperty = {
      name: 'Email',
      type: 'email',
      validators: [Validators.required, ValidationService.emailValidator],
      defaultValue: '',
    },
    public password: FormProperty = {
      name: 'Password',
      type: 'password',
      validators: [Validators.required, ValidationService.passwordValidator],
      defaultValue: '',
    },
    public confirmPassword: FormProperty = {
      name: 'Confirm password',
      type: 'password',
      validators: [Validators.required],
      defaultValue: '',
    }
  ) {
    super();
  }
}
