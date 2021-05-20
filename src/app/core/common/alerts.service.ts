import { Injectable } from '@angular/core';
import { AlertModel } from '../../model/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private defaultAlertDismissTimeMs = 4000;
  public alerts: AlertModel[] = [];

  constructor() {}

  private addAlert(alert: AlertModel, unique: boolean): void {
    if (unique) {
      if (!this.contain(alert.id)) {
        this.alerts.push(alert);
      }
    } else {
      this.alerts.push(alert);
    }
  }

  public contain(id: string): boolean {
    return this.alerts.find((a) => a.id === id) !== undefined;
  }

  public success({
    message,
    id = 'success-alert',
    dismissible = true,
    dismissTimeout = this.defaultAlertDismissTimeMs,
    unique = false,
  }: AlertConfigType): void {
    const alert = new AlertModel(
      id,
      'success',
      message,
      dismissTimeout,
      dismissible
    );
    this.addAlert(alert, unique);
  }

  public error({
    message,
    id = 'error-alert',
    dismissible = true,
    dismissTimeout = this.defaultAlertDismissTimeMs,
    unique = false,
  }: AlertConfigType): void {
    const alert = new AlertModel(
      id,
      'danger',
      message,
      dismissTimeout,
      dismissible
    );
    this.addAlert(alert, unique);
  }

  public warning({
    message,
    id = 'warning-alert',
    dismissible = true,
    dismissTimeout = this.defaultAlertDismissTimeMs,
    unique = false,
  }: AlertConfigType): void {
    const alert = new AlertModel(
      id,
      'warning',
      message,
      dismissTimeout,
      dismissible
    );
    this.addAlert(alert, unique);
  }

  public info({
    message,
    id = 'info-alert',
    dismissible = true,
    dismissTimeout = this.defaultAlertDismissTimeMs,
    unique = false,
  }: AlertConfigType): void {
    const alert = new AlertModel(
      id,
      'info',
      message,
      dismissTimeout,
      dismissible
    );
    this.addAlert(alert, unique);
  }

  public removeAllWithType(type: string): void {
    this.alerts = this.alerts.filter((a) => a.type !== type);
  }

  public removeAllWithId(id: string): void {
    this.alerts = this.alerts.filter((a) => a.id !== id);
  }

  public removeAllExceptId(id: string): void {
    this.alerts = this.alerts.filter((a) => a.id === id);
  }

  public removeAllExceptType(type: string): void {
    this.alerts = this.alerts.filter((a) => a.type === type);
  }

  public clear(): void {
    this.alerts = [];
  }
}

/* ------------------------------------------- AlertConfigType ------------------------------------------- */
export type AlertConfigType = {
  message: string;
  id: string;
  dismissible: boolean;
  dismissTimeout: number;
  sticky: boolean;
  unique: boolean;
};
