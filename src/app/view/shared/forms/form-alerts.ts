import { AlertModel } from 'src/app/model/alert.model';

export class FormAlerts {
  static getInvalidDataInFormAlert(): AlertModel {
    return new AlertModel(
      'custom-danger',
      'Data in form is invalid',
      3000,
      true
    );
  }

  static getSuccessFormAlert(msg: string): AlertModel {
    return new AlertModel('success', msg, 4000, true);
  }
}
