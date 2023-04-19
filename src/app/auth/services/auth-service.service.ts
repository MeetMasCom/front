import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, User } from '../interfaces/user';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  register(user: User): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/user`, {
      userName: user.userName,
      email: user.email,
      dateBirth: user.dateBirth,
      password: user.password,
      terms: user.terms,
      country: user.country,
    });
  }

  login(user: LoginUser): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/user/login`, {
      userName: user.userNameL,
      password: user.passwordL,
    });
  }

  validateOtp(otp: any, userName: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/valid-login`,
      {
        userName: userName,
        otp: otp,
      }
    );
  }

  getCountries(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/country`);
  }

  validateUserEmail(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/validate/${param}`
    );
  }
}
