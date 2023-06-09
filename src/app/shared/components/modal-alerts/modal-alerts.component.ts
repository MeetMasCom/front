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


  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
        {
          key: 'alias',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Alias',
            placeholder: 'Alias',
            required: true,
            disabled: true
          },
        },
        {
          key: 'sigla',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Sigla',
            placeholder: 'Sigla',
            required: true,
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'url',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Url',
            placeholder: 'Url',
            required: true,
          },
          validators: {
            validation: ['url']
          }
        },
        {
          key: 'tag',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Tag',
            placeholder: 'Tag',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'detalle',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Detalle',
            placeholder: 'Detalle',
            required: true,
          },
        },
        {
          key: 'dir',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Dirección',
            placeholder: 'Dirección',
            required: true,
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'tipo',
          type: 'select',
          className: 'w-100 mx-2',
          props: {
            label: 'Tipo',
            placeholder: 'Tipo',
            required: true,
            options: [
              { value: 1, label: 'Crypto' },
              { value: 2, label: 'Profit' },
            ],
          },
        },
        {
          key: 'costo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Costo',
            placeholder: 'Costo',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    }
  ];

  fieldsP: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'minimoProfit',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Mínimo Retiro Profit',
            placeholder: 'Mínimo Retiro Profit',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maximoProfitB',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Bronce Profit',
            placeholder: 'Máximo retiro Bronce Profit',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maximoProfitP',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Plata Profit',
            placeholder: 'Máximo retiro Plata Profit',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'maximoProfitO',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Oro Profit',
            placeholder: 'Máximo retiro Oro Profit',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maximoProfitD',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Diamante Profit',
            placeholder: 'Máximo retiro Diamante Profit',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    }
  ];

  fieldsC: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'minimoRetiro',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Mínimo Retiro',
            placeholder: 'Mínimo Retiro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxretiroB',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Bronce',
            placeholder: 'Máximo retiro Bronce',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxretiroP',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Plata',
            placeholder: 'Máximo retiro Plata',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'maxretiroO',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Oro',
            placeholder: 'Máximo retiro Oro',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
        {
          key: 'maxretiroD',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Máximo retiro Diamante',
            placeholder: 'Máximo retiro Diamante',
            required: true,
          },
          validators: {
            validation: ['price'],
          },
        },
      ]
    },


  ];

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

  onUpdateWallet(data: WalletI) {
    this.sendModal.emit(data)
  }

}
