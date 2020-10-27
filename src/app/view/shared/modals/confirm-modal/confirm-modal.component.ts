import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  modalTxt = 'All your unsaved changes will be discarded. Continue?';
  @Output() confirmEmitter: EventEmitter<any> = new EventEmitter();
  @Output() declineEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
