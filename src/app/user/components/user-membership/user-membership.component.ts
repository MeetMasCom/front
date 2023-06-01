import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class UserMembershipComponent implements OnInit {
  @ViewChild('infoBuyMembership') infoBuyMembership!: ModalAlertsComponent;
  @ViewChild('successBuyM') successBuyM!: ModalAlertsComponent;
  @ViewChild('failBuyM') failBuyM!: ModalAlertsComponent;

  membresias: any = [];
  user: any;
  message = '';
  selectItem: any;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    await this.getMembership();
  }

  async getMembership() {
    try {
      const response = await lastValueFrom(this.userService.getAllMembership());

      if (response.data.length > 0) {
        response.data.map((item: any) => {
          if (item.state) {
            this.membresias.push(item);
          }
        });
      }
    } catch (error: any) {
      this.membresias = [];
    }
  }

  onSelectMembership(item: any) {
    console.log('item', item);
    this.selectItem = item;
    this.infoBuyMembership.abrir();
  }

  async onBuyMembership() {
    try {
      const response = await lastValueFrom(
        this.userService.buyMembership(this.user._id, this.selectItem._id)
      );
      console.log('resp', response);

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
    this.router.navigate(['/home']);
  }
}
