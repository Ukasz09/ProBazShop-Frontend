import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export class ModalBase {
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) {}

 
}
