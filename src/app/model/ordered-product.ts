export class OrderedProduct {
  constructor(
    public id: string | number,
    public name: string,
    public description: string,
    public imageUrl: string,
    public size: string,
    public color: string,
    public pricePerItem: number,
    public orderedQty: number,
    public orderDate: Date
  ) {}
}
