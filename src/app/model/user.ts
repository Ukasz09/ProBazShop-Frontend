import { OrderedProduct } from './ordered-product';

export class User {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public history: OrderedProduct[],
    public type: string
  ) {}
}

export class UserAccountType {
  static readonly CLIENT = 'CLIENT';
  static readonly EMPLOYEE = 'EMPLOYEE';
}
