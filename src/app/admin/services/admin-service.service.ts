import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient, public constante: ConstantsSystem) { }

  createMembership(form: any): Observable<any> {
    const body = {
      code: form.value.codeMember,
      name: form.value.nameMember,
      price: form.value.priceMember,
      description: form.value.descMember,
    };
    return this.http.post(`${this.constante.API_SERVER}/membsership`, body);
  }

  getAllMembership(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/membsership`);
  }

  updateMembership(id: string, form: any): Observable<any> {
    const body = {
      name: form.value.nameMember,
      price: form.value.priceMember,
      description: form.value.descMember,
      state: true,
    };
    return this.http.put(
      `${this.constante.API_SERVER}/membsership/${id}`,
      body
    );
  }

  deleteMembership(id: string, item: any): Observable<any> {
    const body = {
      name: item.name,
      price: item.price,
      description: item.description,
      state: !item.state,
    };
    return this.http.put(
      `${this.constante.API_SERVER}/membsership/${id}`,
      body
    );
  }


  createWalletE(form: any): Observable<any> {
    return this.http.post(`${this.constante.API_SERVER}/billetera/createBilleteraE`, form);
  }

  getAllBilleteraE(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billetera`);
  }

  updateWallet(id: string, item: WalletI): Observable<any> {
    return this.http.post(
      `${this.constante.API_SERVER}/billetera/updateBilleteraE/${id}`,
      item
    );
  }


  deleteWallet(id: string, item: WalletI): Observable<any> {
    item.estado = !item.estado;
    return this.http.post(
      `${this.constante.API_SERVER}/billetera/updateBilleteraE/${id}`,
      item
    );
  }

  getAllRechargs(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/balanceCompany/rechargs`);
  }


}
