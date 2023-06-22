import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import * as moment from 'moment';
import { FinanceServiceService } from 'src/app/finance/services/finance-service.service';
import { BalanceUserI } from 'src/app/finance/interfaces/balanceUser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
moment.locale("es");

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class UserMembershipComponent implements OnInit {
  @ViewChild('infoBuyMembership') infoBuyMembership!: ModalAlertsComponent;
  @ViewChild('successBuyM') successBuyM!: ModalAlertsComponent;
  @ViewChild('failBuyM') failBuyM!: ModalAlertsComponent;

  selectedWallet!: string;
  membresias!: any[];
  user: any;
  message = '';
  currentMembership!: any;
  selectItem: any;
  validDate!: string
  balances: BalanceUserI[] = [];
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'walletId',
      className: 'w-100 mx-2',
      type: 'select',
      props: {
        label: 'Saldo',
        placeholder: 'Selecciona saldo',
        required: true,
        options: [],
      },
    },
  ];

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private financeServiceService: FinanceServiceService,
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    this.getBalance();
    await this.getMembership();
    await this.getCurrentMembership();
  }

  async getCurrentMembership() {
    try {
      const response = await lastValueFrom(this.userService.getCurrentMembership(this.user._id));

      if (response.data == null) {
        this.currentMembership = this.membresias.find((f: any) => f.code == 'BRONCE');
      } else {
        this.currentMembership = response.data;
        this.validDate = moment(response.data.createdAt).add(1, 'months').format('LLLL');
      }
    } catch (error: any) {
      this.currentMembership = null;
    }
  }

  getBalance() {
    const user = sessionStorage.getItem('id')
    this.financeServiceService.getBalanceByUser(user!).subscribe(res => {
      this.balances = res.data;
      this.fields[0].props!.options = res.data.map((item: BalanceUserI) => {
        return {
          label: item.alias,
          value: item.walletId
        }
      })
    })
  }

  async getMembership() {
    try {
      const response = await lastValueFrom(this.userService.getAllMembership());

      if (response.data.length > 0) {
        let membership: any = [];
        response.data.map((item: any) => {
          if (item.state) {
            membership.push(item);
          }
        });
        this.membresias = membership;
      }
    } catch (error: any) {
      this.membresias = [];
    }
  }

  onSelectMembership(item: any) {
    this.selectItem = item;
  }

  onSubmit(value: any) {
    this.selectedWallet = value.walletId;
    this.infoBuyMembership.abrir();
  }

  async onBuyMembership() {
    try {
      const response = await lastValueFrom(
        this.userService.buyMembership(this.user._id, this.selectItem._id, this.selectedWallet)
      );
      if (response.data !== null) {
        this.message = response.message;
        this.successBuyM.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.failBuyM.abrir();
    }
  }

  onRedirigir() {
    location.reload();
  }
}
