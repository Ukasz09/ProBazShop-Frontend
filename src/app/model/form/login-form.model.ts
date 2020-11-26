import { Validators } from '@angular/forms';
import { FormModel, FormProperty } from './form-model';

export class LoginFormModel extends FormModel {
  constructor(
    public email: FormProperty = {
      name: 'Email',
      type: 'email',
      validators: [Validators.required],
      defaultValue: '',
    },
    public password: FormProperty = {
      name: 'Password',
      type: 'password',
      validators: [Validators.required],
      defaultValue: '',
    }
  ) {
    super();
  }
}
