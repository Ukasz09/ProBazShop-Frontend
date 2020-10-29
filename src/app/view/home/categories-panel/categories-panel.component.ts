import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit {
  //TODO: tmp mocked
  categories: string[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
  }
}
