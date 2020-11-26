import { AlertModel } from 'src/app/model/alert.model';

export class FormAlerts {
  static readonly INVALID_DATA_ALERT_ID = 'data_invalid';
  static readonly SUCCESSFUL_REGISTRATION_ALERT_ID = 'successful_registration';
  static readonly SUCCESSFUL_LOGON_ALERT_ID = 'successful_logon';
  static readonly SUCCESSFUL_LOGOFF_ALERT_ID = 'successful_logoff';

  static getSuccessFormAlert(id: string, msg: string): AlertModel {
    return new AlertModel(id, 'success', msg, 4000, true);
  }
  static getDangerFormAlert(id: string, msg: string): AlertModel {
    return new AlertModel(id, 'custom-danger', msg, 4000, true);
  }
}
