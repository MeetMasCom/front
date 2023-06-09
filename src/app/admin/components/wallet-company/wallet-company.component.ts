import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';

@Component({
  selector: 'app-wallet-company',
  templateUrl: './wallet-company.component.html',
  styleUrls: ['./wallet-company.component.css']
})
export class WalletCompanyComponent implements OnInit {

  @ViewChild('successCreateM')
  successCreateM!: ModalAlertsComponent;
  @ViewChild('failCreateM')
  failCreateM!: ModalAlertsComponent;
  @ViewChild('modalUpdateM') modalUpdateM!: ModalAlertsComponent;
  @ViewChild('successUpdateM')
  successUpdateM!: ModalAlertsComponent;
  @ViewChild('failUpdateM')
  failUpdateM!: ModalAlertsComponent;
  @ViewChild('infoDeleteM')
  infoDeleteM!: ModalAlertsComponent;
  @ViewChild('successDeleteM')
  successDeleteM!: ModalAlertsComponent;
  @ViewChild('failDeleteM')
  failDeleteM!: ModalAlertsComponent;

  wallet!: WalletI
  form = new FormGroup({});
  model: any = {};
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

  message = '';

  wallets: WalletI[] = []

  constructor(private adminService: AdminServiceService) { }



  async ngOnInit() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllBilletera()
      );

      if (response.data.length > 0) {
        this.wallets = response.data;
      }
    } catch (error: any) {
      this.wallets = [];
    }
  }

  onRedirigir() {
    location.reload();
  }


  async onSubmit(model: any) {
    try {
      const response = await lastValueFrom(
        this.adminService.createWalletE(model)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successCreateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failCreateM.abrir();
    }
  }

  onUpdate(data: WalletI) {
    this.wallet = data;
    this.modalUpdateM.abrir();
  }

  onQuestion(data: WalletI) {
    this.wallet = data;
    this.infoDeleteM.abrir();
  }

  async onDelete() {
    try {
      const response = await lastValueFrom(
        this.adminService.deleteWallet(this.wallet._id!, this.wallet)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successDeleteM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failDeleteM.abrir();
    }
  }

  async onForm(form: WalletI) {
    try {
      const response = await lastValueFrom(
        this.adminService.updateWallet(this.wallet._id!, form)
      );

      if (response.data !== null) {
        this.message = response.message;
        this.successUpdateM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failUpdateM.abrir();
    }
  }
}
