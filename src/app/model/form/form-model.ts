import { ValidatorFn } from '@angular/forms';

export type FormProperty = {
  name: string;
  type: string;
  validators: ValidatorFn[];
  defaultValue: string;
};

export abstract class FormModel {
  getProperty(name: string): FormProperty {
    return this[name];
  }

  getPropertiesNameList(): string[] {
    return Object.keys(this);
  }
}
