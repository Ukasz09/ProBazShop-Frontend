import { Component, OnInit } from '@angular/core';
import { MapMarker } from './models/map-marker';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public mockedMarkers: MapMarker[] = [
    {
      _id: 0,
      latitude: 51.1075,
      longitude: 17.032,
    },
    {
      _id: 4,
      latitude: 51.101,
      longitude: 17.03,
    },
    {
      _id: 1,
      latitude: 51.1,
      longitude: 17,
    },
    {
      _id: 2,
      latitude: 51.1,
      longitude: 17.06,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
