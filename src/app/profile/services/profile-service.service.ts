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


  registerPost(id:string,post: Post,file:File,val:string): Observable<any> {

    const fd = new FormData();
    fd.append('user_id', id);
    fd.append('description', post.pdescription);
    fd.append('archivo', file);
    fd.append('profile_id', val);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/post/createPost`,fd
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/user/userById/${id}`);
  }


  getPostByIdUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/getPostByIdUser/${id}`);
  }


  updateProfile(id:string, form:any, img:string){
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/post/updateProfile/${id}`,
    {
      description:form.updescription,
      image:img
    });  
  }

  getProfile(): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/profile/getAllProfile`);
  }

  addProfile(id:string, form:any){
    console.log(form);
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/profile/addProfile/${id}`,
    {
      profile:form.aprofile
    });  
  }

  getProfileById(id:string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/profile/profileById/${id}`);
  }

  getProfileUserPost(id:string,profile:string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/getPostIdUser/${id}?profile=`+profile);  
  }

  getPostUserProfileId(id:string,profile:string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/getPostUserProfile?id=`+id+`&profile=`+profile);  
  }

  getCountPost(id:string,profile:string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/getCountPost/${id}?profile=`+profile);  
  }

}
