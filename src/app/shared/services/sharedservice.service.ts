import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logout } from '../interfaces/logout';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class SharedserviceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  logout(user: Logout): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
    });

    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/logout/${user.id}`,
      {
        userName: user.userName,
        password: user.password,
      },
      {
        headers: headers,
      }
    );
  }

  sumaryService(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/user/count`);
  }
}
