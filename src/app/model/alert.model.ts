export class AlertModel {
  constructor(
    public id: string,
    public type: string,
    public msg: string,
    public timeout: number = 3000,
    public dismissible: boolean = true
  ) {}
}
