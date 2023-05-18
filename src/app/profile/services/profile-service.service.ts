import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { Post } from '../interfaces/post';
import { ConstantsSystem } from '../../utils/constants-system';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}


  registerPost(id:string,post: Post,file:File): Observable<any> {
    console.log(file);
    console.log(post);
    const fd = new FormData();
    fd.append('user_id', id);
    fd.append('description', post.pdescription);
    fd.append('archivo', file);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/createPost`,fd
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/user/userById/${id}`);
  }


  getPostByIdUser(id: string): Observable<any> {
    console.log("servicio",id);
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/user/getPostByIdUser/${id}`);
  }


}
