import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit {
  categories: string[] = [];
  colors:string[]=["white","red","green","blue","yellow","black","brown","gray"]
  sizes:string[]=["XS","S","M","L","XL","XXL","> XXL","< XS"]

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((data: string[]) => {
      this.categories = data;
      this.categories.sort();
    });
  }
}
