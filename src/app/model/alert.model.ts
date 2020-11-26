export class AlertModel {
  constructor(
    public id: string,
    public type: string,
    public msg: string,
    public timeout: number,
    public dismissible: boolean
  ) {}
}
