import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logout } from '../interfaces/logout';

@Injectable({
  providedIn: 'root',
})
export class SharedserviceService {
  AUTH_SERVER: string = 'http://localhost:8000/api';

  constructor(private httpCLient: HttpClient) {}

  logout(user: Logout): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
    });

    return this.httpCLient.post(
      `${this.AUTH_SERVER}/user/logout/${user.id}`,
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
    return this.httpCLient.get(`${this.AUTH_SERVER}/user/count`);
  }
}
