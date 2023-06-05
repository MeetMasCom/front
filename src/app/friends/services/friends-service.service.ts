import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { ConstantsSystem } from '../../utils/constants-system';
import { Form } from '@angular/forms';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {


  
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  
  getAllUser(): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getAllUser`);
  }

  getPost(id:string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/postByType/${id}`);
  }

  getPostById(id:string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/postById/${id}`);
  }



}
