import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { RechargeI } from '../interfaces/balanceUser';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }


  getAllByUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/balanceUser/${id}`);
  }

  getBalanceByUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/balanceUser/user/${id}`);
  }

  rechargeBalance(data: RechargeI): Observable<any> {
    data.userId = sessionStorage.getItem('id')!;
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/balanceUser/recharge`, data);
  }
}
