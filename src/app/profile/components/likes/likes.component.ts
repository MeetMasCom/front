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
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  user_data: any;
  api: string='';
  id: string='';
  token: any;
  myLikes: any;
  getLUser: any;
  likeUser: any;

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
 
      this.getmyLikes();
      this.getLikesUser();
      

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getmyLikes() {
    const resp = await lastValueFrom(this.profileService.getMyLikes(this.id));
    if (resp.data) {
      this.myLikes = resp.data;
      console.log(this.myLikes);
    }
  }

  async getLikesUser() {
    const resp = await lastValueFrom(this.profileService.getLikesUser(this.id));
    if (resp.data) {
      this.likeUser = resp.data;
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


}
