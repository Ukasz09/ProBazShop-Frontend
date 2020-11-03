import { FormModel, FormProperty } from './form-model';

export class LoginFormModel extends FormModel {
  constructor(
    public email: FormProperty = {
      name: 'Email',
      type: 'email',
      validators: [],
      defaultValue: '',
    },
    public password: FormProperty = {
      name: 'Password',
      type: 'password',
      validators: [],
      defaultValue: '',
    }
  ) {
    super();
  }
}
