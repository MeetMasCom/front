import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  AUTH_SERVER: string = 'http://localhost:8000/api';

  constructor(private httpCLient: HttpClient) {}

  register(user: User): Observable<any> {
    return this.httpCLient.post(`${this.AUTH_SERVER}/user`, {
      userName: user.userName,
      email: user.email,
      dateBirth: user.dateBirth,
      password: user.password,
      terms: user.terms,
      country: user.country,
    });
  }
}
