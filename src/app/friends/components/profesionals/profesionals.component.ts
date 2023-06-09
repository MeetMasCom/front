import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FriendsServiceService} from 'src/app/friends/services/friends-service.service';
import { ProfileServiceService} from 'src/app/profile/services/profile-service.service';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ConstantsSystem } from 'src/app/utils/constants-system';


@Component({
  selector: 'app-profesionals',
  templateUrl: './profesionals.component.html',
  styleUrls: ['./profesionals.component.css']
})
export class ProfesionalsComponent {
  @ViewChild('postdetailModal') postdetailModal!: MmodalComponent;

  id: string = '';
  api: string = '';
  AllPost: any;
  img: string = '';
  id_post: string = '';
  Post: any;
  imageBase64: string = '';
  constructor(
    private friendsService: FriendsServiceService,
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getPost();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getPost() {
    const val = '2';
    const resp = await lastValueFrom(this.friendsService.getPost(val));

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
}
