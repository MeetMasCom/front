import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  AUTH_SERVER: string = 'http://localhost:8000/api';

  constructor(private httpCLient: HttpClient) {}

  getCatalog(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.AUTH_SERVER}/catalogue/options?code=${param}`
    );
  }

  updateUser(form: any, id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.AUTH_SERVER}/user/${id}`,
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        identification: form.value.identification,
        gender: form.value.genero,
        weight: parseInt(form.value.weight),
        height: parseInt(form.value.talla),
        eyeColor: form.value.ojoscolor,
        currentResidence: form.value.residencia,
        ethnicity: form.value.etnia,
        religion: form.value.religion,
        policy: form.value.policy,
        motherLanguague: form.value.inativo,
        languages: [
          form.value.idioma1,
          form.value.idioma2,
          form.value.idioma3,
          form.value.idioma4,
          form.value.idioma5,
        ],
        foods: [form.value.food],
        hobbies: [form.value.hobies],
        sports: [form.value.sports],
        tasteOfClothes: [form.value.clothes],
        civil_status: form.value.statecivil,
        drink: form.value.drink,
        smoke: form.value.smoke,
        childs: form.value.children,
        studies: form.value.studies,
        body: form.value.bodyform,
        zodiac_sign: form.value.signz,
        career: form.value.profesion,
        sport: form.value.sport,
        image: form.value.imagen,
      },
      {
        headers: headers,
      }
    );
  }
}