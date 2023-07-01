import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LayoutServiceService } from '../../services/layout-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';


@Component({
  selector: 'app-ads-layout',
  templateUrl: './ads-layout.component.html',
  styleUrls: ['./ads-layout.component.css'],
})
export class AdsLayoutComponent implements OnInit {
  @ViewChild('exitoDeleteAdsRev') exitoDeleteAdsRev!: ModalAlertsComponent;
  @ViewChild('failDeleteAdsRev') failDeleteAdsRev!: ModalAlertsComponent;
  @ViewChild('successNotices') successNotices!: ModalAlertsComponent;
  @ViewChild('failNotices') failNotices!: ModalAlertsComponent;

  userId: string = '';
  adsActive: AdsI[] = [];
  adsReview: AdsI[] = [];
  adsReturn: AdsI[] = [];
  adsDisable: AdsI[] = [];
  messague: string = "";


  constructor(private layoutService: LayoutServiceService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('id')!;
    this.getAds();
  }

  async getAds() {
    try {
      const response = await lastValueFrom(
        this.layoutService.onGetAds(this.userId)
      );

      if (response.data !== null) {
        response.data.map((element: any) => {
          if (element.state === 0) {
            this.adsActive.push(element);
          }
          if (element.state === 1) {
            this.adsReview.push(element);
          }
          if (element.state === 2) {
            this.adsReturn.push(element);
          }
          if (element.state === 3) {
            this.adsDisable.push(element);
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
    this.getAds();
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

  openModal(data: any) {
    this.messague = data.messague;
    if (data.result) {
      this.successNotices.abrir();
    } else {
      this.failNotices.abrir();
    }

  }
}
