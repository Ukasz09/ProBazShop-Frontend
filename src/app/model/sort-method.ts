export class SortMethod<T> {
  constructor(public labelText: string, public comp: (a: T, b: T) => number) {}
}
