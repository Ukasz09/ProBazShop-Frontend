import { Validators } from '@angular/forms';
import { FormModel, FormProperty } from './form-model';

export class ShipmentFormModel extends FormModel {
  constructor(
    public address: FormProperty = {
      name: 'Address',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      defaultValue: '',
    },
    public city: FormProperty = {
      name: 'City',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      defaultValue: '',
    },
    public state: FormProperty = {
      name: 'State',
      validators: [Validators.required, Validators.minLength(3)],
    },
    public zip: FormProperty = {
      name: 'Zip code',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      defaultValue: '',
    }
  ) {
    super();
  }
}
