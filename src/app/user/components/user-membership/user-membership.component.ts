import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import * as moment from 'moment';
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

  membresias!: any[];
  user: any;
  message = '';
  currentMembership!: any;
  selectItem: any;
  validDate!: string

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
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
    this.infoBuyMembership.abrir();
  }

  async onBuyMembership() {
    try {
      const response = await lastValueFrom(
        this.userService.buyMembership(this.user._id, this.selectItem._id)
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
