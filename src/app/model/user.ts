import { OrderedProduct } from './ordered-product';

export class User {
  constructor(
    public id: string,
    public name: String,
    public surname: String,
    public email: String,
    public password: String,
    public history: OrderedProduct[],
    public type: string
  ) {}
}

export class UserAccountType {
  static readonly CLIENT = 'CLIENT';
  static readonly EMPLOYEE = 'EMPLOYEE';
}
