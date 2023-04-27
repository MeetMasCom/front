import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.css'],
})
export class ModalAlertsComponent {
  @Input() idModal: string = '';
  @Input() icono: string = '';
  @Input() titulo: string = '';
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() tipo: number = -1;
  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @Output() sendModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalButton') modalButton!: ElementRef;

  constructor() {}

  abrir() {
    this.modalButton.nativeElement.click();
  }

  onSuccess() {
    this.successModal.emit();
  }

  onRecover(form: any) {
    this.sendModal.emit(form);
  }
}
