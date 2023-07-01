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
  ) { }

  onGetAds(id: string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/advertisements/getUserAds/${id}`);
  }

  deleteAds(id: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/advertisements/deleteAdsById`,
      { id: id }
    );
  }

  createAds(
    form: any,
  ): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/advertisements`, form);
  }

  updateAds(form: any, img: string, list: any, id: string): Observable<any> {
    const body = {
      id: id,
      age: list.age,
      job: list.job,
      country: list.country,
      title: form.value.title,
      description: form.value.description,
      link_ads: form.value.alink,
      link_conversion: form.value.alinkc,
      image: img,
      language: list.language,
      hobbies: list.hobbies,
      gender: list.gender,
      religion: list.religion,
      journal: list.journal,
      type_dependency: list.typeDep,
      state: 0,
      package: form.value.visit,
      comentary: '',
    };
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/ads/updateAdsById`,
      body
    );
  }

}
