export enum FilterType {
  CATEGORY,
  SIZE,
  COLOR,
  PRICE_LOW,
  PRICE_HIGH,
  SEARCH_PHRASE
}

export class FilterElem {
  constructor(public value: string, public type: FilterType) {}
}
