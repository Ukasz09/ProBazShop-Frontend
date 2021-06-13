import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @ViewChild('map') mapComponent: MapComponent;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.fetchShopsLocations();
  }

  private fetchShopsLocations(): void {
    this.mapService.getShopsLocations().subscribe({
      next: (markers) => {
        this.mapComponent.addMarkersToMap(markers);
      },
    });
  }
}
