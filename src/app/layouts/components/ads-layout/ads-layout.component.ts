import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LayoutServiceService } from '../../services/layout-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-ads-layout',
  templateUrl: './ads-layout.component.html',
  styleUrls: ['./ads-layout.component.css'],
})
export class AdsLayoutComponent implements OnInit {
  @ViewChild('exitoDeleteAdsRev') exitoDeleteAdsRev!: ModalAlertsComponent;
  @ViewChild('failDeleteAdsRev') failDeleteAdsRev!: ModalAlertsComponent;

  user_id = '';
  adsActive: any = [];
  adsReview: any = [];
  adsReturn: any = [];

  constructor(private layoutService: LayoutServiceService) {}

  ngOnInit() {
    this.user_id = sessionStorage.getItem('id')!;
    this.getAds();
  }

  async getAds() {
    try {
      const response = await lastValueFrom(
        this.layoutService.onGetAds(this.user_id)
      );

      if (response.data !== null) {
        response.data.map((element: any) => {
          if (element.state === 1) {
            this.adsActive.push(element);
          }
          if (element.state === 0) {
            this.adsReview.push(element);
          }
          if (element.state === 2) {
            this.adsReturn.push(element);
          }
        });
      }
    } catch (error: any) {
      this.adsActive = [];
      this.adsReview = [];
      this.adsReturn = [];
    }
  }

  onRedirigir() {
    location.reload();
  }

  async onDelete(id: any) {
    try {
      const response = await lastValueFrom(this.layoutService.deleteAds(id));

      if (response.data !== null) {
        this.exitoDeleteAdsRev.abrir();
      }
    } catch (error: any) {
      this.failDeleteAdsRev.abrir();
    }
  }

  async onUpdate(item: any) {
    sessionStorage.setItem('item', JSON.stringify(item));
    location.reload();
  }
}
