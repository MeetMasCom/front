import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { Billetera } from '../interfaces/billetera';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BilleteraServiceService {

  id:any;
  constructor(
    private httpCLient: HttpClient,
    private router: Router,
    public constante: ConstantsSystem,
    private http: HttpClient
  ) {}


  //billeteras empresa
 
  registerBilleteraEmpresa(billetera: Billetera): Observable<any> { 
    console.log(billetera);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billetera/createBilleteraE`,billetera
    );
  }

  
  getAllBilletera(): Observable<any> {
    return this.httpCLient.get<Billetera[]>(`${this.constante.API_SERVER}/billetera`);
  }

  getBilleteraId(id:String): Observable<any> {
    return this.httpCLient.get<Billetera[]>(`${this.constante.API_SERVER}/billetera/getByIdBilletera/${id}`);
  }


  updateBilleteraEmpresaEstado(id:string,form:any):Observable<any> { 
    console.log("formulario",form);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billetera/updateBilleteraE/${id}`,form
    );
  }


  //billeteras user
  createBilletera(billetera: Billetera): Observable<any> { 
    console.log(billetera);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billeteraU/createBilleteraU`,billetera
    );
  }

  getAllBilleteraUserId(id:string): Observable<any> {
    return this.httpCLient.get<Billetera[]>(`${this.constante.API_SERVER}/billeteraU/getByIdUserBilleteraU/${id}`);
  }



}
