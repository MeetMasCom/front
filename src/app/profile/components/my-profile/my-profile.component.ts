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
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('postModal') postModal!: MmodalComponent;

  photoSelected: any;
  classA: string = '';
  message: string = '';
api:string='';
id:string='';
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
      this.getUser();
      this.getPostUser();
      
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  async getUser(){
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img=this.dataUser.image;
      this.imageBase64= 'data:image/png;base64,'+''+this.img // Aquí colocas tu cadena Base64
      
   
    }
  }
  
  async getPostUser(){
    const resp = await lastValueFrom(this.profileService.getPostByIdUser(this.id));
    if (resp.data.length > 0) {
      this.Post = resp.data;   
    }else{
      console.log("no se encontraron datos");
    }
  }

  Actualizar(){
    this.router.navigate(['/dataUser']);
  }

  Publicar(){
    this.postModal.abrir();
  }

  cargarImagen(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

          const reader = new FileReader();
          reader.onload = (e) => (this.photoSelected = reader.result);
          reader.readAsDataURL(this.file);
  
      } else {
      console.log('seleccione una foto');
    }
  }


  onRefresh(){
    location.reload();
  }

  async RegisterPost(event:any){
    try{
      const resp = await lastValueFrom(this.profileService.registerPost(this.id,event.value,this.file));
      this.classA = 'alert-success';
      this.message = resp.message;          this.message = resp.message;
      this.correctModal.abrir();    
    
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }
}
