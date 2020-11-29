import { OrderedProduct } from './ordered-product';

export class User {
  constructor(
    public name: String,
    public surname: String,
    public email: String,
    public password: String,
    public history: OrderedProduct[],
    public type: UserAccountType
  ) {}
}

export enum UserAccountType {
  CLIENT,
  EMPLOYEE,
}
