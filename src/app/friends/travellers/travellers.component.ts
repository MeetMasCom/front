import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FriendsServiceService} from 'src/app/friends/services/friends-service.service';
import { ProfileServiceService} from 'src/app/profile/services/profile-service.service';
import { ConstantsSystem } from 'src/app/utils/constants-system';

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.css']
})
export class TravellersComponent {

id:string='';
api:string='';
dataUser:any;
AllUser:any;
img:string='';
imageBase64:string='';
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
      this.getUser();
      this.getAllUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  async getUser(){
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img=this.dataUser.image;
      this.imageBase64= 'data:image/png;base64,'+''+this.img;     
   
    }
  }

  async getAllUser(){
    const resp = await lastValueFrom(this.friendsService.getAllUser());

    if (resp?.data.length > 0) {
      this.AllUser = resp?.data;      
      console.log("usuarios",this.AllUser);
    }
  }

  selectedProfile(id:string){
    this.router.navigate(['/userProfile', id]);
  }

}
