export class Product {
  constructor(
    public id: string | number,
    public name: string,
    public description: string,
    public imageUrl: string,
    public size: string,
    public color: string,
    public price: number,
    public createdAt: Date,
    public starRating: number,
    public availableQty: number,
    public category: string
  ) {}
}
