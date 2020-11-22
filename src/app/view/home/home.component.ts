import { Component, OnInit } from '@angular/core';
import { AlertModel } from 'src/app/model/alert.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  constructor(private alertService: AlertsService) {}

  ngOnInit(): void {}

  get alerts(): AlertModel[] {
    return Array.from(this.alertService.alerts.values());
  }

  removeAlert(id: string) {
    console.log("rem",id)
    this.alertService.removeAlertWithId(id);
  }
}
