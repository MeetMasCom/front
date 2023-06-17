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
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  @ViewChild('postdetail') postdetail!: MmodalComponent;

  photoSelected: any;
  classA: string = '';
  message: string = '';
api:string='';
id:string='';
id_user:string='';
img:string='';
dataUser: any;
Post: any=[];
imageBase64:string='';
file!: File;
  profile: any;
  PostD: any;
  user: string='';

  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      //this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.queryParams.subscribe(async (params) => {
        
        this.id_user = params['param1'];
        this.profile = params['param2'];
         console.log("user",this.id_user);
        //  if(this.id===this.id_user){
        //   // this.router.navigate(['/',this.user])
        //     this.router.navigate(['/myProfile'])
        //  }
        this.getUser();
        //this.getPostUser();
        this.getPostUserProfile();
      });

      
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser(){
    const resp = await lastValueFrom(this.profileService.getUserById(this.id_user));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img=this.dataUser.image;
      this.imageBase64= 'data:image/png;base64,'+''+this.img // Aquí colocas tu cadena Base64
      console.log(this.dataUser);   
    }
  }
  
  async getPostUser(){
    const resp = await lastValueFrom(this.profileService.getPostByIdUser(this.id_user));
    if (resp.data.length > 0) {
      this.Post = resp.data;   
    }else{
      console.log("no se encontraron datos");
    }
  }

  async getPostUserProfile(){
    const resp = await lastValueFrom(this.profileService.getPostUserProfileId(this.id_user,this.profile));
    if (resp.data.length > 0) {
       this.Post = resp.data;  
    }else{
      console.log("no se encontraron datos");
    }
  }

  async selectedPost(id:string){
    const resp = await lastValueFrom(this.friendsService.getPostById(id));

    if (resp?.data.length > 0) {
      this.PostD = resp?.data[0];
    }
    this.postdetail.abrir();
  }

}
