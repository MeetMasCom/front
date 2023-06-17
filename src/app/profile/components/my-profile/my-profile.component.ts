import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { FriendsServiceService } from '../../../friends/services/friends-service.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { faUserPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('postModal') postModal!: MmodalComponent;
  @ViewChild('updateProfile') updateProfile!: MmodalComponent;
  @ViewChild('addProfile') addProfile!: MmodalComponent;
  @ViewChild('mperfil') mperfil!: MmodalComponent;
  @ViewChild('postdetail') postdetail!: MmodalComponent;


  @ViewChild('selectElement') selectElement: any;
  faUserPlus = faUserPlus;
  faElipsis = faEllipsis;

  photoSelected: any;
  classA: string = '';
  message: string = '';
  api: string = '';
  id: string = '';
  img: string = '';
  dataUser: any;
  Post: any = [];
  imageBase64: string = '';
  file!: File;
  token: any;
  profile: any;
  myProfile: any;
  perfil: any[] = [];
  valorSeleccionado: string = '';
  val: string = '';
  count: number = 0;
  PostD: any;
  user_data: any;
  estado: number=0;
  followers:number=0;
  followings:number=0;
  notification: any;
  myLikes: any;
  LikesUser: any;
  cMyLike=0;
  cLikeUser=0;
 valPerfil: any = [];

  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    library: FaIconLibrary
  ) { library.addIconPacks(fas, far, fab);}

  ngOnInit(): void {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getUser();
      this.getProfile();
      this.getmyLikes();
      this.getLikesUser();

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img = this.dataUser.image;
      this.imageBase64 = 'data:image/png;base64,' + '' + this.img;
      this.myProfile = this.dataUser.profile;
      for (let i = 0; i < this.myProfile.length; i++) {
        const elemento = this.myProfile[i].profile_id;
        const resp = await lastValueFrom(
          this.profileService.getProfileById(elemento)
        );;
        console.log("perfiles usuario", this.profileService)

        this.followers=this.dataUser.followers.length;
        this.followings=this.dataUser.following.length;
        this.perfil.push(resp.data[0]);
        this.val = this.perfil[0]._id;
        this.getPostUser();
        this.getCountPost();
        this.onValidateUser();
      }
    }
  }

  async getPostUser() {
  
    const resp = await lastValueFrom(
      this.profileService.getProfileUserPost(this.id, this.val)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } 
  }

  Update() {
    this.updateProfile.abrir();
  }

  Publicar() {
    this.postModal.abrir();
  }

  cargarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);

      const reader1 = new FileReader();
      reader1.readAsDataURL(this.file);
      reader1.onload = () => {
        const base64String = reader1.result!.toString().split(',')[1];
        const pureBase64 = base64String.replace(/[^a-zA-Z0-9+/]/g, '');
        this.img = pureBase64;
      };
    } else {
      console.log('seleccione una foto');
    }
  }

  onRefresh() {
    location.reload();
  }

  async RegisterPost(event: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.registerPost(
          this.id,
          event.value,
          this.img,
          this.val
        )
      );
      this.classA = 'alert-success';
      this.message = resp.message;
      this.correctModal.abrir();
    } catch (error: any) {
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }

  async UpdateProfile(event: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.updateProfile(this.id, event.value, this.img)
      );
      this.classA = 'alert-success';
      this.message = resp.message;
      this.correctModal.abrir();
    } catch (error: any) {
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }

  async getProfile() {
    const resp = await lastValueFrom(this.profileService.getProfile());
    if (resp.data.length > 0) {
      this.profile = resp.data;
    } 
  }

  Add() {
    this.addProfile.abrir();
  }

  async AddProfile(event: any) {
    try {
      
      this.valPerfil.push({
        profile_id: event.value.aprofile,
        username: event.value.userNameP,
      });
      const resp = await lastValueFrom(
        this.profileService.addProfile(this.id, event)
      );
      if (resp.data.length > 0) {
        this.profile = resp.data;
        location.reload();
      } 
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.mperfil.abrir();
      this.valPerfil=[];
     // location.reload();
    }
  }

  selectProfile(event: any) {
    this.Post = '';
    const textoSeleccionado =
      event.target.options[event.target.selectedIndex].text;
    this.valorSeleccionado = textoSeleccionado;
    this.val = event.target.options[event.target.selectedIndex].value;
    this.getPostUser();
    this.getCountPost();
  }

  async getCountPost() {
    const resp = await lastValueFrom(
      this.profileService.getCountPost(this.id, this.val)
    );
    if (resp.data) {
      this.count = resp.data;
    } 
  }

  async selectedPost(id: string) {
    const resp = await lastValueFrom(this.friendsService.getPostById(id));

    if (resp?.data.length > 0) {
      this.PostD = resp?.data[0];
    }
    this.postdetail.abrir();
  }

  async deletePost(id: string) {
    const resp = await lastValueFrom(this.profileService.deletePost(id));
    if (resp.data.deletedCount === 1) {
      location.reload();
    }
  }

  onValidateUser() {

    this.dataUser.state.forEach((element:any) => {
      if(element===1){
        this.estado = 1;
      } 
    });
  }


  async AddSocialN(event: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.addSocialN(this.id, event.value)
      );
      if (resp.data.length > 0) {
        this.profile = resp.data;
        //location.reload();
      } 
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.mperfil.abrir();
    }
  }

  async getNotificacion(){
    const resp = await lastValueFrom(this.profileService.getNotification(this.id));
    if (resp.data.length > 0) {
      this.notification = resp.data;
     
    } else {
      console.log('no se encontraron datos');
    }
  }

  async getmyLikes() {
    const resp = await lastValueFrom(
      this.profileService.getMyLikes(this.id)
    );
    if (resp.data) {
      this.myLikes = resp.data;
      this.cMyLike=this.myLikes.length;
    } 
  }

  async getLikesUser() {
    const resp = await lastValueFrom(
      this.profileService.getLikesUser(this.id)
    );
    if (resp.data) {
      this.LikesUser = resp.data;
      this.cLikeUser=this.LikesUser.length;
    } 
  }

}
