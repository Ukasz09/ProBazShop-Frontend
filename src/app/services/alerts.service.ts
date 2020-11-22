import { Injectable } from '@angular/core';
import { AlertModel } from '../model/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alerts: Map<string, AlertModel> = new Map();

  constructor() {}

  addAlert(alert: AlertModel): void {
    this.alerts.set(alert.id, alert);
  }

  removeAlertWithId(id: string) {
    if (this.alerts.has(id)) this.alerts.delete(id);
  }

  clearAllAlerts(): void {
    this.alerts.clear();
  }
}
