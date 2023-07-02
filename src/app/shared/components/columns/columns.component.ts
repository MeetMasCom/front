import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AdsI } from '../../interfaces/ad.interface';
import { lastValueFrom } from 'rxjs';
import { LayoutServiceService } from 'src/app/layouts/services/layout-service.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  @Input() tipo = 0;
  ads: AdsI[] = [];
  faStar = faStar;
  userId!: string

  constructor(private layoutService: LayoutServiceService) {

  }


  ngOnInit(): void {
    if (sessionStorage.getItem('id')!) {
      this.userId = sessionStorage.getItem('id')!;
      this.getAsdByUser();
    }
  }

  async openAds(item: AdsI) {
    try {
      lastValueFrom(
        this.layoutService.visitAds(this.userId, item._id!)
      );
      window.open(item.link, '_blank');
    } catch (error: any) {
    }
  }

  async getAsdByUser() {
    try {
      const response = await lastValueFrom(
        this.layoutService.onGetAdsForUser(this.userId)
      );
      if (response.data !== null) {
        this.ads = response.data;
      }
    } catch (error: any) {
      this.ads = [];
    }
  }
}
