import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
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

  constructor(
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_user = params['id'];
        this.getUser();
      this.getPostUser();
        
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

}
