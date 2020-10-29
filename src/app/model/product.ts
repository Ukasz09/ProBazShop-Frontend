export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageURI: string,
    public size: string,
    public color: string,
    public price: number,
    public releaseDate: Date,
    public starRating: number
  ) {}
}
