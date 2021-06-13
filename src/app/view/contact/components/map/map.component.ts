import * as L from 'leaflet';
import { Component, Input, OnInit } from '@angular/core';
import { MapMarker } from '../../models/map-marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() markers: MapMarker[] = [];

  private readonly startLatlng: [number, number] = [51.107883, 17.038538];
  private readonly defaultZoom = 13;
  private readonly tileProvider = {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };

  private map: L.Map;
  private tileLayer: L.TileLayer;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.startLatlng,
      zoom: this.defaultZoom,
    });
    this.initMapTiles();
    this.addMarkersToMap();
  }

  private initMapTiles(): void {
    this.tileLayer = L.tileLayer(this.tileProvider.urlTemplate, {
      maxZoom: 19,
      attribution: this.tileProvider.attribution,
    });
    this.tileLayer.addTo(this.map);
  }

  private addMarkersToMap(): void {
    for (const marker of this.markers) {
      const leafletMarker = this.getLeafletMarker(marker);
      leafletMarker.addTo(this.map);
    }
  }

  private getLeafletMarker(marker: MapMarker): L.Marker {
    const markerIcon = L.divIcon({
      className: 'bg-transparent',
      html: this.getMarkerHtml(),
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
    const leafletMarker = L.marker([marker.latitude, marker.longitude], {
      icon: markerIcon,
    });
    return leafletMarker;
  }

  private getMarkerHtml(): string {
    return `<div style='${this.getMarkerWrapperStyles()}'
    class='border border-secondary d-flex justify-content-center'>
    <div style='${this.getMarkerStyles()}' class='material-icons text-light'>store</div>
    </div>`;
  }

  private getMarkerWrapperStyles(): string {
    return `transform: rotate(-45deg);
      border-radius: 50% 50% 50% 0;
      background-color: orangered`;
  }

  private getMarkerStyles(): string {
    return `transform: rotate(45deg); margin:5px; font-size: 1.5em`;
  }
}
