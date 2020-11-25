import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/model/form/form-model';

@Component({
  selector: 'app-form-ui-generator',
  templateUrl: './form-ui-generator.component.html',
  styleUrls: ['./form-ui-generator.component.scss'],
})
export class FormUiGeneratorComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formDatamodel: FormModel;
  @Input() submitBtnTxt = 'Submit';
  @Input() backBtnTxt = 'Back';

  @Output() onSubmitBtnClickEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onBackBtnClickEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
