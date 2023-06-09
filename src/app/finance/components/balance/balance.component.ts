import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent {


  balances: any[] = [{
    code: "USD",
    price: 2,
    name: "USD"
  }]

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-flex flex-row ',
      fieldGroup: [
        {
          key: 'Dirección/Correo',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'Dirección/Correo',
            placeholder: 'Dirección/Correo',
            required: true,
          },
        },
        {
          key: 'N° Documento',
          type: 'input',
          className: 'w-100 mx-2',
          props: {
            label: 'N° Documento',
            placeholder: 'N° Documento',
            required: true,
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'd-flex flex-row justify-content-between',
      fieldGroup: [
        {
          key: 'valor',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Valor',
            placeholder: 'Valor',
            required: true,
          },
          validators: {
            validation: ['price']
          }
        },
        {
          key: 'detalle',
          className: 'w-100 mx-2',
          type: 'input',
          props: {
            label: 'Detalle',
            placeholder: 'Detalle',
            required: true,
          },
        },
      ]
    },
  ];

  constructor(

  ) { }

  ngOnInit(): void {

  }

  onSubmit(item: any) {

  }


}
