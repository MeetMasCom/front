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
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import {
  faCircleCheck,
  faCircleXmark,
  faLocationDot,
  faCakeCandles,
  faPeopleArrows,
  faCalendar,
  faUser,
  faAsterisk,
  faCircleArrowRight,
  faFileSignature,
  faLanguage,
  faGraduationCap,
  faBriefcase,
  faLaptopFile,
  faWeightScale,
  faLineChart,
  faUserPlus,
  faHandsPraying,
  faPerson,
  faEye,
  faChild,
  faClockFour,
  faPlateWheat,
  faMedal,
  faPersonWalking,
  faSmoking,
  faMartiniGlass,
  faChildren,
  faShirt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  @ViewChild('postdetail') postdetail!: MmodalComponent;
  @ViewChild('errorMatch') errorMatch!: MmodalComponent;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faLocationDot = faLocationDot;
  faCakeCandles = faCakeCandles;
  faPeopleArrows = faPeopleArrows;
  faUser = faUser;
  faCalendar = faCalendar;
  faAsterisk = faAsterisk;
  faCircleArrowRight= faCircleArrowRight;
  faLanguage=faLanguage;
  faGraduationCap=faGraduationCap;
  faBriefcase=faBriefcase;
  faLaptopFile=faLaptopFile;
  faWeightScale=faWeightScale;
  faLineChart=faLineChart;
  faUserPlus=faUserPlus;
  faHandsPraying=faHandsPraying;
  faPerson=faPerson;
  faEye=faEye;
  faChild=faChild;
  faClockFour=faClockFour;
  faPlateWheat=faPlateWheat;
  faMedal=faMedal;
  faPersonWalking=faPersonWalking;
  faSmoking=faSmoking;
  faMartiniGlass=faMartiniGlass;
  faChildren=faChildren;
  faShirt=faShirt;
  

  photoSelected: any;
  classA: string = '';
  message: string = '';
  api: string = '';
  id: string = '';
  id_user: string = '';
  img: string = '';
  dataUser: any;
  Post: any = [];
  data: any = [];
  imageBase64: string = '';
  file!: File;
  profile: string = '';
  PostD: any;
  user: string = '';
  estado: any;
  dataStar: any;
  currentRate = 0;
  usuario: any;
  star = 0;
  rating: number = 0;
  id_star: string = '';
  ban: number = 0;
  userLike: any;
  like: number = 0;
  type: number = 0;
  idLike: string = '';
  qualification: any;
  user_id: any;
  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private adminService: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('data')!) {
      this.data = sessionStorage.getItem('data')!;      
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.activatedRoute.queryParams.subscribe(async (params) => {
        this.id_user = params['param1'];
        this.profile = params['param2'];
       
        //  if(this.id===this.id_user){
        //   // this.router.navigate(['/',this.user])
        //     this.router.navigate(['/myProfile'])
        //  }
        //this.getPostUser();
        this.album();
        this.getPostUserProfile();
        this.getUserLike();
      });
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(
      this.profileService.getUserById(this.id_user)
    );

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.img = this.dataUser.image;
      this.imageBase64 = 'data:image/png;base64,' + '' + this.img;
      this.estado = this.dataUser.state[this.dataUser.state.length - 1];
     
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

  async getPostUser() {
    const resp = await lastValueFrom(
      this.profileService.getPostByIdUser(this.id_user)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async getPostUserProfile() {
    const resp = await lastValueFrom(
      this.profileService.getPostUserProfileId(this.id_user, this.profile)
    );
    if (resp.data.length > 0) {
      this.Post = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async selectedPost(id: string) {
    const resp = await lastValueFrom(this.friendsService.getPostById(id));
    if (resp?.data.length > 0) {
      this.PostD = resp?.data[0];
      this.user_id=this.PostD.user_id;
      const resp1 = await lastValueFrom(this.profileService.getStarIdUser(this.id,id));
      if (resp1?.data.length > 0) {
        this.qualification=resp1.data[0];
        this.star=this.qualification.qualification;
        
      }
      else
      {
        this.star=0;
      }
    }
    this.postdetail.abrir();
  }

  async addLike(idUserLike: string, val: boolean) {
    try {
      const resp = await lastValueFrom(
        this.profileService.addLike(this.id, idUserLike, val, this.profile)
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
    } catch (error: any) {
      console.log('error', error.error);
      //this.errorMatch.abrir();
    }
  }

  async setRating($event: any) {
    try {
     //console.log("datos",$event);
      if (this.star === 0) {
        const resp=await this.onRegisterStar($event.post_id,$event.qualification);
        if (resp !== null) {
          const message = 'Le dio me gusta a tú publicación';
          const resp1 = await lastValueFrom(
            this.adminService.addNotification(this.id, this.user_id, message)
          );
          if (resp1 !== null) {
            location.reload();
          }
        }
       } 
      //else {
      //   await this.onUpdateStar(this.id, this.dataStar);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  async onRegisterStar(idpost:string,qualification:number) {
    try {
      await lastValueFrom(this.profileService.registerRatingStar(idpost,qualification,this.id));
      location.reload();
    } catch (error: any) {
      console.log('error', error.error);
      //this.errorMatch.abrir();
    }
  }

  async onUpdateStar(id: string, dataStar: any) {
    try {
      await lastValueFrom(this.profileService.UpdateStar(id, dataStar));
    } catch (error) {
      console.log(error);
    }
  }

  async getUserLike() {
    try {
      this.like = 0;
      const resp = await lastValueFrom(
        this.profileService.getUserLike(this.id, this.profile, this.id_user)
      );
      if (resp?.data) {
        this.userLike = resp.data[0];
        this.idLike = this.userLike._id;
        if (this.userLike.like === true) {
          this.like = 1;
        }
        if (this.userLike.like === false) {
          this.like = 2;
        }
      } else {
        this.like = 0;
      }
    } catch (error: any) {
      console.log('error', error.error);
      //this.errorMatch.abrir();
    }
  }

  async updateLike(user_id: string, val: boolean) {
    try {
      const resp = await lastValueFrom(
        this.profileService.updateLike(
          this.idLike,
          this.id,
          user_id,
          val,
          this.profile
        )
      );
      if (resp.data > 0) {
        if (val === true) {
          const message = 'Le dio me gusta a tú publicación';
          const resp1 = await lastValueFrom(
            this.adminService.addNotification(this.id, user_id, message)
          );
          if (resp1 !== null) {
            location.reload();
          }
        } else {
          location.reload();
        }
      }
    } catch (error: any) {
      console.log('error', error.error);
      //this.errorMatch.abrir();
    }
  }

  async deleteLike() {
    try {
      const resp = await lastValueFrom(
        this.profileService.deleteLike(this.idLike)
      );
      if (resp !== null) {
        location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
      //this.errorMatch.abrir();
    }
  }

  album() {
    this.ban = 0;
    if (this.ban === 0) {
      this.getUser();
    }
  }

  detalle() {
    this.ban = 1;
  }
}
