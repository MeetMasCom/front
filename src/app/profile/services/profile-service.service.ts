import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { Post } from '../interfaces/post';
import { ConstantsSystem } from '../../utils/constants-system';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProfileServiceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  registerPost(
    id: string,
    post: Post,
    file: string,
    val: string
  ): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/post/createPost`,
      {
        user_id: id,
        title:post.ptitle,
        description: post.pdescription,
        photo: file,
        profile_id: val,
      }
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/user/userById/${id}`
    );
  }

  getPostByIdUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/post/getPostByIdUser/${id}`
    );
  }

  updateProfile(id: string, form: any, img: string) {
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/post/updateProfile/${id}`,
      {
        description: form.updescription,
        image: img,
      }
    );
  }

  getProfile(): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/profile/getAllProfile`
    );
  }

  addProfile(id: string, form: any) {
    console.log(form.value);
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/profile/addProfile/${id}`,
      {
        profile_id:form.value.aprofile,
        username:form.value.userNameP
      }
    );
  }

  getProfileById(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/profile/profileById/${id}`
    );
  }

  getProfileUserPost(id: string, profile: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/post/getPostIdUser/${id}?profile=` + profile
    );
  }

  getPostUserProfileId(id: string, profile: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/post/getPostUserProfile?id=` +
        id +
        `&profile=` +
        profile
    );
  }

  getCountPost(id: string, profile: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/post/getCountPost/${id}?profile=` + profile
    );
  }

  deletePost(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/post/deletePost/${id}`
    );
  }

  addSocialN(id: string, form: any) {
    console.log("id", id);
    console.log("id", form);
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/profile/addSocialN/${id}`,
      {
        user:form.rsocial, 
        red:form.reds
      }
    );
  }

  getUserGender(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/user/userByGender/${id}`
    );
  }

  getUserOnline(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/user/userOnline/${id}`
    );
  }

  getUserActive(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/user/userActive/${id}`
    );
  }


  addFollowers(idFollower: string, id:string) {
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/profile/addFollowers/${id}`,
      {
        followers:idFollower
      }
    );
  }

  addFollowing(idFollowing: string, id: string) {
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/profile/addFollowings/${id}`,
      {
        following: idFollowing,
      }
    );
  }


  addLike(user_id:string,userlike:string,val:boolean) {
    console.log("servicio");
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/like/addLike`,
      {
       user_id:user_id,
       userlike:userlike,
       like:val
      }
    );
  }

  getNotification(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/like/getByIdLike/${id}`
    );
  }

  getNotificationUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/notification/getNotificationByIdUser/${id}`
    );
  }

  updateNotificationLike(id: string): Observable<any> {
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/like/updateLike/${id}`,{
        state:1
      }
    );
  }

  updateNotification(id: string): Observable<any> {
    return this.httpCLient.post<any>(
      `${this.constante.API_SERVER}/notification/updateNotification/${id}`,{
        state:1
      }
    );
  }

   registerSpam(
    id: string,form:any, idSpam:string
  ): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/spam/addSpam`,
      {
        user_id: id,
        user_spam:idSpam,
        title:form.value.stitulo,
        message: form.value.smensaje,
      }
    );
  }


  getSpamUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/spam/getByIdSpam/${id}`
    );
  }

    
  validateUserEmail(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/validate/${param}`
    );
  }


  //usuarios a los que di like
  getMyLikes(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/like/getMyLike/${id}`);
  }


  //usuarios que me dieron like
  getLikesUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(
      `${this.constante.API_SERVER}/like/getByIdLike/${id}`);
  }


  updateSocialAgreements(id: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/updateSocialAgreements/${id}`,
      {
        socialAgreements: true,
      }
    );
  }
}
