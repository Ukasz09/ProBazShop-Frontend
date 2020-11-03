import { AlertModel } from 'src/app/model/alert.model';

export abstract class AlertBase {
  alerts: AlertModel[] = [];

  addAlert(alert: AlertModel): void {
    this.alerts.push(alert);
  }

  removeAlert(alertToDismiss: AlertModel): void {
    this.alerts = this.alerts.filter((alert) => alert !== alertToDismiss);
  }

  clearAllAlerts(): void {
    this.alerts = [];
  }
}
