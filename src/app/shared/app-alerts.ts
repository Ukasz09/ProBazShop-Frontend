import { AlertModel } from 'src/app/model/alert.model';

export class AppAlerts {
  static readonly INVALID_DATA_ALERT_ID = 'data_invalid';
  static readonly SUCCESSFUL_REGISTRATION_ALERT_ID = 'successful_registration';
  static readonly SUCCESSFUL_LOGON_ALERT_ID = 'successful_logon';
  static readonly SUCCESSFUL_LOGOFF_ALERT_ID = 'successful_logoff';
  static readonly PRODUCT_REMOVE_NOT_CONFIRMED_ID = 'user_delete_not_confirmed';
  static readonly PRODUCT_REMOVE_CONFIRMED_ID = 'product_delete_confirmed';
  static readonly PRODUCT_UPDATE_CONFIRMED_ID = 'product_update_confirmed';
  static readonly USER_UPDATE_SUCCESSFUL = 'user_update_successful';
  static readonly USER_UPDATE_ERROR = 'user_update_error';
  static readonly USER_REMOVE_NOT_CONFIRMED_ID = 'delete_user_not_confirmed';
  static readonly USER_DELETE_SUCCESSFUL = 'delete_user_successful';
  static readonly USER_DELETE_ERROR = 'delete_user_error';
  static readonly PRODUCT_UPDATE_NOT_CONFIRMED_ID = 'delete_confirmed';
  static readonly USER_UPDATE_NOT_CONFIRMED_ID = 'user_update_not_confirmed';

  static getSuccessAlert(id: string, msg: string): AlertModel {
    return new AlertModel(id, 'success', msg, 2000, true);
  }

  static getDangerFormAlert(id: string, msg: string): AlertModel {
    return new AlertModel(id, 'custom-danger', msg, 4000, true);
  }

  static getWarningFormAlert(id: string, msg: string): AlertModel {
    return new AlertModel(id, 'warning', msg, 3000, true);
  }
}
