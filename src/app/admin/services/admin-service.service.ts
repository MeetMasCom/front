import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { LoginAdmin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient, public constante: ConstantsSystem, private httpCLient: HttpClient,) {}

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

  createAdmin(form: any,rol:any): Observable<any> {
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


  verifyUser(id:string,verify:boolean): Observable<any> {    
    const body = {
      verify: verify
    };
    return this.http.post(`${this.constante.API_SERVER}/user/verifyUser/${id}`, body);
  }

  getAllSpam(): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/spam/getAllSpam`);
  }

  getDetailSpam(id:string): Observable<any> {
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
    return this.http.get(`${this.constante.API_SERVER}/ads/ads`);
  }

  getAdsById(id:string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/ads/getByIdAds/${id}`);
  }

  updateStateAds(id:string,message:any,state:number): Observable<any> {
    const body = {
      state:state,
      comentary:message,
    }; 
    return this.http.post(`${this.constante.API_SERVER}/ads/updateStateAds/${id}`,body);
  }

  
  addMessageSpam(id:string,form:any): Observable<any> {
    const state=1;
     const body = {
      notification: form.value.mensajeSpam,
      state: state,
    }; 
    return this.http.post(`${this.constante.API_SERVER}/spam/updateSpam/${id}`, body)
}

addNotification(id:string,userNot:string,message:string): Observable<any> {
   const body = {
    user_id:id,
    user_notification: userNot,
    message: message,
  };
  console.log(body);
  return this.http.post(`${this.constante.API_SERVER}/notification/addNotification`, body)
}

registerPaqueteAds(form:any): Observable<any> {
   const body = {
    name: form.value.pname,
    description: form.value.pdescription,
    visit:form.value.pvisit,
    valor:form.value.pval
  }; 
  return this.http.post(`${this.constante.API_SERVER}/package/addPackage`, body)
}

getAllPackage(): Observable<any> {
  return this.http.get(`${this.constante.API_SERVER}/package/getAllPackage`);
}

getPackageById(id:string): Observable<any> {
  return this.http.get(`${this.constante.API_SERVER}/package/getByIdPackage/${id}`);
}


getPackageActive(): Observable<any> {
  return this.http.get(`${this.constante.API_SERVER}/package/getActivePackage`);
}

updatePackage(id:string,form:any): Observable<any> {
  const body = {
    name: form.value.pname,
    description: form.value.pdescription,
    visit:form.value.pvisit,
    valor:form.value.pval,
  }; 
  return this.http.post(`${this.constante.API_SERVER}/package/updatePackage/${id}`,body);
}

updateStatePackage(id:string,state:number): Observable<any> {
  const body = {
    state:state,
  }; 
  return this.http.post(`${this.constante.API_SERVER}/package/updateSate/${id}`,body);
}

updateStateAdmin(id:string,state:number): Observable<any> {
  const body = {
    state:state,
  }; 
  return this.http.post(`${this.constante.API_SERVER}/admin/updateState/${id}`,body);
}

getAdminById(id:string): Observable<any> {
  return this.http.get(`${this.constante.API_SERVER}/admin/getByIdAdmin/${id}`);
}

updateAdmin(id:string,form:any): Observable<any> {
  const body = {
    userName: form.value.nameAdmin,
    email: form.value.emailAdmin,
   
  }; 
  return this.http.post(`${this.constante.API_SERVER}/admin/updateAdmin/${id}`,body);
}

}
