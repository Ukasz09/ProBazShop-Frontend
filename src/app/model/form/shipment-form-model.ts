import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
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
      validators: [Validators.required, ValidationService.cityValidator],
      defaultValue: '',
    },
    public state: FormProperty = {
      name: 'State',
      validators: [Validators.required],
    },
    public zip: FormProperty = {
      name: 'Zip code',
      type: 'text',
      validators: [Validators.required, ValidationService.zipcodeValidator],
      defaultValue: '',
    }
  ) {
    super();
  }
}
