import { Product } from './product';

export class CartProduct {
  constructor(public product: Product, public qty: number) {}
}
