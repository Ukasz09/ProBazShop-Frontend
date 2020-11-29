export class OrderedProduct {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageURL: string,
    public size: string,
    public color: string,
    public pricePerItem: number,
    public orderedQty: number,
    public orderDate: Date
  ) {}
}
