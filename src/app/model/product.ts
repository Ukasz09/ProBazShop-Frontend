export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageURL: string,
    public size: string,
    public color: string,
    public price: number,
    public createdAt: Date,
    public starRating: number,
    public availableQty: number,
    public category: string
  ) {}
}
