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
  @Input() descripcion: string = '';
  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalButton') modalButton!: ElementRef;

  constructor() {}

  abrir() {
    this.modalButton.nativeElement.click();
  }

  onSuccess() {
    this.successModal.emit();
  }
}
