export enum FilterType {
  TEXT,
  BUTTON,
}

export class FilterElem {
  constructor(public value: string, public type: FilterType) {}
}
