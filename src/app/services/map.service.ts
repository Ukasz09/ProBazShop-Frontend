import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapMarker } from '../view/contact/models/map-marker';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  public getShopsLocations(): Observable<MapMarker[]> {
    const url = `${environment.API_URL}/api/shops`;
    return this.http.get<MapMarker[]>(url);
  }
}
