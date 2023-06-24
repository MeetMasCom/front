import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { BilleteraUserI } from '../interfaces/billetera';

@Injectable({
  providedIn: 'root'
})
export class BilleteraServiceService {

  id: any;
  constructor(
    public constante: ConstantsSystem,
    private http: HttpClient
  ) { }

  createWalletUser(form: BilleteraUserI): Observable<any> {
    return this.http.post(`${this.constante.API_SERVER}/billeteraU/createBilleteraU`, form);
  }

  updateWalletUser(walletId: string, form: BilleteraUserI): Observable<any> {
    return this.http.put(`${this.constante.API_SERVER}/billeteraU/updateBilleteraU/${walletId}`, form);
  }

  getAllBilleteraUser(userId: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billeteraU/getByIdUserBilleteraU/${userId}`);
  }

  validOpt(userId: string, otp: string): Observable<any> {
    return this.http.post(`${this.constante.API_SERVER}/billeteraU/validOtp`, {
      userId, otp
    });
  }

  createOpt(userId: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billeteraU/validOtp/${userId}`);
  }

}
