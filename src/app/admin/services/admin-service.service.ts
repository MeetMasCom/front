import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { WalletI } from 'src/app/shared/interfaces/wallet.interface';
import { ReviewRechargeI, ReviewRetreatI } from 'src/app/finance/interfaces/balanceUser';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient, public constante: ConstantsSystem, private httpCLient: HttpClient,) { }

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

  reviewRecharg(item: ReviewRechargeI): Observable<any> {
    return this.http.post(
      `${this.constante.API_SERVER}/balanceUser/review-recharge`,
      item
    );
  }

  reviewRetrat(item: ReviewRetreatI): Observable<any> {
    return this.http.post(
      `${this.constante.API_SERVER}/balanceUser/review-retreat`,
      item
    );
  }


  createAdmin(form: any, rol: any): Observable<any> {
    console.log(" formulario servicio", form.value);
    const body = {
      userName: form.value.userAdmin,
      email: form.value.emailAdmin,
      password: form.value.passAdmin,
      rol: rol,
    };
    return this.http.post(`${this.constante.API_SERVER}/admin/adminRegister`, body);
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/admin/`);
  }

  getUserVerify(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/profile/userVerify`);
  }


  verifyUser(id: string, verify: boolean): Observable<any> {
    const body = {
      verify: verify
    };
    return this.http.post(`${this.constante.API_SERVER}/user/verifyUser/${id}`, body);
  }

  getAllSpam(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/spam/getAllSpam`);
  }

  getDetailSpam(id: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/spam/getDetailSpam/${id}`);
  }


  login(user: any): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/admin/login`, {
      userName: user.userAdmin,
      password: user.passAdmin,
    });
  }

  validateOtp(otp: any, userName: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/admin/valid-login`,
      {
        userName: userName,
        otp: otp,
      }
    );
  }

  getAllAds(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/advertisements/getAll`);
  }


  updateStateAds(id: string, state: number, comentary: string): Observable<any> {
    const body = {
      state,
      comentary,
    };
    return this.http.post(`${this.constante.API_SERVER}/advertisements/updateStateAds/${id}`, body);
  }


  addMessageSpam(id: string, form: any): Observable<any> {
    const state = 1;
    const body = {
      notification: form.value.mensajeSpam,
      state: state,
    };
    return this.http.post(`${this.constante.API_SERVER}/spam/updateSpam/${id}`, body)
  }

  addNotification(id: string, userNot: string, message: string): Observable<any> {
    const body = {
      user_id: id,
      user_notification: userNot,
      message: message,
    };
    return this.http.post(`${this.constante.API_SERVER}/notification/addNotification`, body)
  }

  registerPaqueteAds(form: any): Observable<any> {
    const body = {
      name: form.value.pname,
      description: form.value.pdescription,
      visit: form.value.pvisit,
      valor: form.value.pval
    };
    return this.http.post(`${this.constante.API_SERVER}/package/addPackage`, body)
  }

  getAllPackage(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/package/getAllPackage`);
  }

  getPackageById(id: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/package/getByIdPackage/${id}`);
  }


  getPackageActive(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/package/getActivePackage`);
  }

  updatePackage(id: string, form: any): Observable<any> {
    const body = {
      name: form.value.pname,
      description: form.value.pdescription,
      visit: form.value.pvisit,
      valor: form.value.pval,
    };
    return this.http.post(`${this.constante.API_SERVER}/package/updatePackage/${id}`, body);
  }

  updateStatePackage(id: string, state: number): Observable<any> {
    const body = {
      state: state,
    };
    return this.http.post(`${this.constante.API_SERVER}/package/updateSate/${id}`, body);
  }

  updateStateAdmin(id: string, state: number): Observable<any> {
    const body = {
      state: state,
    };
    return this.http.post(`${this.constante.API_SERVER}/admin/updateState/${id}`, body);
  }

  getAdminById(id: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/admin/getByIdAdmin/${id}`);
  }

  updateAdmin(id: string, form: any): Observable<any> {
    const body = {
      userName: form.value.nameAdmin,
      email: form.value.emailAdmin,

    };
    return this.http.post(`${this.constante.API_SERVER}/admin/updateAdmin/${id}`, body);
  }

  getAllProfiles(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/profile/getAllProfile`);
  }

  getProfileById(id: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/profile/profileById/${id}`);
  }

  registerProfile(form: any): Observable<any> {
    const body = {
      name: form.value.pname,
      description: form.value.pdescription,
    };
    return this.http.post(`${this.constante.API_SERVER}/profile/createProfile`, body)
  }

  updateStateProfile(id: string, state: any): Observable<any> {
    const body = {
      state: state,
    };
    console.log(body);
    return this.http.post(`${this.constante.API_SERVER}/profile/updateStateProfile/${id}`, body)
  }

  updateProfile(id: string, form: any): Observable<any> {
    const body = {
      name: form.value.pname,
      description: form.value.pdescription,
    };
    return this.http.post(`${this.constante.API_SERVER}/profile/updateProfile/${id}`, body)
  }

  getUserSocials(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/user/userSocialAgreements`);
  }


  getFeedBack(): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/feedback/getFeedBack`);
  }



}
