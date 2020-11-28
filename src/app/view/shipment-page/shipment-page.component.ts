import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentFormModel } from 'src/app/model/form/shipment-form-model';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { FormAlerts } from 'src/app/shared/forms/form-alerts';
import { FormLogicUtils } from 'src/app/shared/forms/form-logic-utils';

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.scss'],
})
export class ShipmentPageComponent implements OnInit {
  formDataModel: ShipmentFormModel;
  shipmentForm: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private alertService: AlertsService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.initShipmentForm();
  }

  private initShipmentForm() {
    this.formDataModel = new ShipmentFormModel();
    this.shipmentForm = FormLogicUtils.makeFormFromModel(this.formDataModel);
  }

  onBuyBtnClick() {
    console.log(this.shipmentForm);
    if (this.shipmentForm.dirty && this.shipmentForm.valid) {
      this.cartService.clearProductList();
      this.alertService.addAlert(
        FormAlerts.getSuccessAlert(
          FormAlerts.SUCCESSFUL_REGISTRATION_ALERT_ID,
          'Successful products purchase'
        )
      );
      this.router.navigateByUrl('/home');
    } else {
      this.alertService.addAlert(
        FormAlerts.getDangerFormAlert(
          FormAlerts.INVALID_DATA_ALERT_ID,
          'Invalid data in form'
        )
      );
    }
  }

  removeAlert(id: string) {
    this.alertService.removeAlertWithId(id);
  }

  //MOCKS
  states = [
    null,
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
}
