import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  static cityValidator(control: FormControl) {
    if (control.value.match(/\b([a-zA-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)) return null;
    else return { invalidCity: true };
  }

  static zipcodeValidator(control: FormControl) {
    if (control.value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) return null;
    else return { invalidZipcode: true };
  }

  static emailValidator(control: FormControl) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    )
      return null;
    else return { invalidEmailAddress: true };
  }

  static passwordValidator(control: FormControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/))
      return null;
    else return { invalidPassword: true };
  }

  static nameValidator(control: FormControl) {
    if (ValidationService.nameOrSurameInvalid(control))
      return { invalidName: true };
    return null;
  }

  static surnameValidator(control: FormControl) {
    if (ValidationService.nameOrSurameInvalid(control))
      return { invalidSurname: true };
    return null;
  }

  private static nameOrSurameInvalid(control: FormControl): boolean {
    if (control.value.match(/\b([a-zA-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)) return false;
    return true;
  }

  static getValidatorErrorMessage(
    validatorName: string,
    validatorValue?: any
  ): string {
    let validationMsg = {
      required: 'This field is required',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Password must be at least 6 characters long, and contain a number.',
      invalidName: 'Name is not valid',
      invalidSurname: 'Surname is not valid',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      invalidZipcode: `Invalid zipcode`,
      invalidCity: `Invalid city name`,
    };
    return validationMsg[validatorName];
  }
}
