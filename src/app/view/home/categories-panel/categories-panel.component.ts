import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss'],
})
export class CategoriesPanelComponent implements OnInit {
  //TODO: tmp mocked
  categories: string[] = [
    'Buty',
    'Plaszcze',
    'Spodnie',
    'T-shirty',
    'Kurtki',
    'Polary',
    'Spodenki',
    'Sukienki',
    'Spódnice',
  ];

  constructor() {}

  ngOnInit(): void {}
}
