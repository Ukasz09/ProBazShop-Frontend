import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FilterElem, FilterType } from '../applied-filters/filter-model';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit {
  FilterType = FilterType;
  categories: string[] = [];
  colors: string[] = [
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'black',
    'brown',
    'gray',
  ];
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '>XXL', '<XS'];
  appliedFilters: FilterElem[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((data: string[]) => {
      this.categories = data;
      this.categories.sort();
    });
  }

  //TODO: alow adding only one from each filter type (category, color, ...)
  addFilter(value: string, filterType: FilterType) {
    let theSameFilter = this.appliedFilters.find(
      (filter: FilterElem) => filter.value == value && filter.type == filterType
    );
    let findInFilters = theSameFilter != undefined;
    if (!findInFilters) {
      let filter = new FilterElem(value, filterType);
      this.appliedFilters.push(filter);
    }
  }
}
