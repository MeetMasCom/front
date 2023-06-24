import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { WalletI } from '../../interfaces/wallet.interface';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

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
  @Input() data: any;
  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @Output() sendModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalButton') modalButton!: ElementRef;


  public Editor = ClassicEditor;

  abrir() {
    this.modalButton.nativeElement.click();
  }

  onSuccess() {
    this.successModal.emit();
  }

  onRecover(form: any) {
    this.sendModal.emit(form);
  }

  onUpdateMembership(form: any, data: any) {
    form.value['descMember'] = data.description;
    this.sendModal.emit(form);
  }


}
