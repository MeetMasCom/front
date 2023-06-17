import { Component, ViewChild } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('errorMatch') errorMatch!: MmodalComponent;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  user_data: any;
  api: string = '';
  id: string = '';
  token: any;
  dataUser: any;
  userGender: any = [];
  gender: string = '';
  userGenderOnline: any;
  userGenderActive: any;
  myLikes: any;
  objGender: any=[];
  objGenderOnline: any=[];
  objGenderActive: any=[];

  constructor(
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private adminService: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);

    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getUser();
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
      this.dataUser = resp.data[0];
      this.gender = this.dataUser.preferences;
      const resp1 = await lastValueFrom(
        this.profileService.getUserGender(this.gender)
      );
      if (resp1?.data.length > 0) {
        this.userGender = resp1.data;
      }
      const resp2 = await lastValueFrom(
        this.profileService.getUserOnline(this.gender)
      );
      if (resp2?.data.length > 0) {
        this.userGenderOnline = resp2.data;
      }
      const resp3 = await lastValueFrom(
        this.profileService.getUserActive(this.gender)
      );
      if (resp3?.data.length > 0) {
        this.userGenderActive = resp3.data;
      }
    }
  }

  async getmyLikes() {
    const resp = await lastValueFrom(this.profileService.getMyLikes(this.id));
    if (resp.data) {
      this.myLikes = resp.data;
    }
  }

  async getLikesUser() {
    const resp = await lastValueFrom(this.profileService.getLikesUser(this.id));
    if (resp.data) {
      this.getLikesUser = resp.data;
    }
  }

  calcularEdad(fechaN: string): number {
    const hoy = new Date();
    const fechaNacimiento = new Date(fechaN);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  }

  async follower(idSeguidor: string) {
    const resp = await lastValueFrom(
      this.profileService.addFollowers(this.id, idSeguidor)
    );
    if (resp?.data.length > 0) {
      //console.log("usuario agregado a seguidos");
    }

    const resp1 = await lastValueFrom(
      this.profileService.addFollowing(idSeguidor, this.id)
    );
    if (resp1?.data.length > 0) {
      // console.log("usuario agregado a seguidores");
    }
  }

  async addLike(idUserLike: string, val: boolean) {
    try{
      const resp = await lastValueFrom(

        this.profileService.addLike(this.id, idUserLike, val)
      );
      if (resp !== null) {
        const message = 'Le dio me gusta a tú publicación';
        const resp1 = await lastValueFrom(
          this.adminService.addNotification(this.id, idUserLike, message)
        );
        if (resp1 !== null) {
          location.reload();
        }
      }
    }catch (error: any) {
      console.log('error', error.error);
      this.errorMatch.abrir();
    }
    
  }

}
