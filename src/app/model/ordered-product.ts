export class OrderedProduct {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageURI: string,
    public size: string,
    public color: string,
    public pricePerItem: number,
    public orderedQty: number,
    public orderDate: Date,
    public category: string = 'unknown'
  ) {}
}
