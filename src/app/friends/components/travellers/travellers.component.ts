import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FriendsServiceService } from 'src/app/friends/services/friends-service.service';
import { ProfileServiceService } from 'src/app/profile/services/profile-service.service';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ConstantsSystem } from 'src/app/utils/constants-system';

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.css'],
})
export class TravellersComponent {
  @ViewChild('postdetailModal') postdetailModal!: MmodalComponent;

  id: string = '';
  api: string = '';
  AllPost: any;
  img: string = '';
  id_post: string = '';
  Post: any;
  imageBase64: string = '';
  profile: any;
  username: string='';
  constructor(
    private friendsService: FriendsServiceService,
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('user')!) {
      this.username = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.params.subscribe(async (params) => {        
        this.profile = params['id'];        
        this.getPost();
      });
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getPost() {
    this.AllPost='';
    const resp = await lastValueFrom(this.friendsService.getPost(this.profile));

    if (resp?.data.length > 0) {
      this.AllPost = resp?.data;
    }
  }

  selectedProfile(idUser: string) {
    if(this.id===idUser){
      //this.router.navigate(['/myProfile']);  
    }else{
      //this.router.navigate(['/userProfile', idUser]);
    }
    
  }

  async selectedPost(id: string) {
    this.id_post = id;
    const resp = await lastValueFrom(this.friendsService.getPostById(id));

    if (resp?.data.length > 0) {
      this.Post = resp?.data[0];
    }
    this.postdetailModal.abrir();
  }

  verPerfil(user:String){    
    const param1 = user;
    const param2 = this.profile;
     if(this.id===user){
       this.router.navigate(['/myProfile']);
     }else{    
      this.router.navigate(['/userProfile'], {
        queryParams: { param1, param2 }
      })
    }
  }
}
