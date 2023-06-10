import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  getCatalog(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/catalogue/options?code=${param}`
    );
  }

  getCountries(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/country`);
  }

  updateUserBasic(
    form: any,
    id: string,
    token: string,
    img: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/basic/${id}`,
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        motherLanguague: form.value.inativo,
        studies: form.value.studies,
        image: img,
        description: form.value.description,
        journal: form.value.journal,
        time_work: form.value.deplab,
      },
      {
        headers: headers,
      }
    );
  }

  updateUserAddress(form: any, id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/address/${id}`,
      {
        address: form.value.address,
        primaryStreet: form.value.principal,
        secondaryStreet: form.value.secundaria,
        reference: form.value.referencia,
        identification: form.value.identification,
      },
      { headers: headers }
    );
  }

  updateUser(form: any, id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/${id}`,
      {
        weight: parseInt(form.value.weight),
        height: parseInt(form.value.talla),
        eyeColor: form.value.ojoscolor,
        ethnicity: form.value.etnia,
        currentResidence: form.value.residencia,
        religion: form.value.religion,
        policy: form.value.policy,
        languages: [
          form.value.idioma1,
          form.value.idioma2,
          form.value.idioma3,
          form.value.idioma4,
          form.value.idioma5,
        ],
        foods: form.value.food.split(','),
        hobbies: form.value.hobies.split(','),
        sports: form.value.sports.split(','),
        tasteOfClothes: form.value.clothes.split(','),
        civil_status: form.value.statecivil,
        drink: form.value.drink,
        smoke: form.value.smoke,
        childs: form.value.children,
        studies: form.value.studies,
        body: form.value.bodyform,
        zodiac_sign: form.value.signz,
        career: form.value.profesion,
        sport: form.value.sport,
      },
      {
        headers: headers,
      }
    );
  }

  recoverPass(user: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/recover-password`,
      {
        username: user,
      }
    );
  }

  resetPass(user: string, pass: string, code: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/reset-password`,
      {
        username: user,
        password: pass,
        code: code,
      }
    );
  }

  createAds(
    form: any,
    user_id: string,
    img: string,
    list: any
  ): Observable<any> {
    const body = {
      user_id: user_id,
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
    return this.httpCLient.post(`${this.constante.API_SERVER}/ads`, body);
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

  getAllMembership(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/membsership`);
  }

  buyMembership(idUser: string, idMem: string): Observable<any> {
    const body = {
      userId: idUser,
      membershipId: idMem,
    };

    return this.httpCLient.post(
      `${this.constante.API_SERVER}/membsership/membership-user`,
      body
    );
  }

  getAllReferes(id: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/refers/${id}`
    );
  }

  getInfoUser(id: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/${id}`
    );
  }
}
