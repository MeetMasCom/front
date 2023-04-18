import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fad } from '../interfaces/fad';
import {Coment} from '../interfaces/comment';
import {Star} from '../interfaces/star';

@Injectable({
  providedIn: 'root'
})
export class FadServiceService {

  AUTH_SERVER: string = 'http://localhost:8000/api';

  constructor(private httpCLient: HttpClient) { }

  register(user_id: string, name: string,description:string,image: File): Observable<any> {
    const fd = new FormData();    
    fd.append('user_id', user_id);
    fd.append('name', name);
    fd.append('description', description);
    fd.append('image', image);
    return this.httpCLient.post(`${this.AUTH_SERVER}/fad/fadRegister`,fd);
  }

  getFads() : Observable<any>{
    return this.httpCLient.get<Fad[]>(`${this.AUTH_SERVER}/fad/`);
  }

  getFadId(id: string) {
    return this.httpCLient.get<Fad>(`${this.AUTH_SERVER}/fad/getByIdFad/${id}`);
  }

  getCommentByIdFad(id: string) {
    console.log("id publicacion",id);
    return this.httpCLient.get<Fad>(`${this.AUTH_SERVER}/comment/commentByIdFad?fad=${id}`);
  }

registerComment(Coment:Coment): Observable<any> {
  return this.httpCLient.post(`${this.AUTH_SERVER}/comment/commentRegister`,{
    user_id:Coment.user_id,
    fad_id:Coment.fad_id,
    comment:Coment.comment
  });
}

registerRatingStar(data: any): Observable<any> {
  return this.httpCLient.post(`${this.AUTH_SERVER}/star/starRegister`,data);
}


getStartUserFadId(user: string,fad:string) {
  console.log("id publicacion",fad);
  console.log("id usuario",fad);
  return this.httpCLient.get<Fad>(`${this.AUTH_SERVER}/star/getStarUserFadId?user=${user}&fad=${fad}`);
}
}
