import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class LayoutServiceService {
  http: any;
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  onGetAds(id:string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/ads/getAdsById/${id}`);
  }

  deleteAds(id: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/ads/deleteAdsById`,
      { id: id }
    );
  }
}
