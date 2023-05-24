import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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


  @ViewChild('selectElement') selectElement: any;
  faUserPlus = faUserPlus;

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
      this.getProfile();
      this.getPostUser();      

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
        const elemento = this.myProfile[i];
        const resp = await lastValueFrom(
          this.profileService.getProfileById(elemento)
        );
        this.perfil.push(resp.data[0]);     
        this.val = this.perfil[0]._id;
        this.getPostUser();
      }
    }
  }

  async getPostUser() {
    // const resp = await lastValueFrom(
    //   this.profileService.getPostByIdUser(this.id)
    // );
    // if (resp.data.length > 0) {
    //   this.Post = resp.data;
    // } else {
    //   console.log('no se encontraron publicaciones');
    // }
    const resp = await lastValueFrom(
      
      this.profileService.getProfileUserPost(this.id,this.val)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } else {
      console.log('no se encontraron publicaciones');
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
          this.file,
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
    } else {
      console.log('no se encontraron datos');
    }
  }

  Add() {
    this.addProfile.abrir();
  }

  async AddProfile(event: any) {
    const resp = await lastValueFrom(
      this.profileService.addProfile(this.id, event.value)
    );
    if (resp.data.length > 0) {
      this.profile = resp.data;
      console.log('perfiles', this.profile);
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  selectProfile(event: any) {
    this.Post = '';
    const textoSeleccionado =
      event.target.options[event.target.selectedIndex].text;
    this.valorSeleccionado = textoSeleccionado;
    this.val = event.target.options[event.target.selectedIndex].value;
    this.getPostUser();
  }
}
