import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminServiceService } from '../../services/admin-service.service';
import { ProfileServiceService } from '../../../profile/services/profile-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sup-notices',
  templateUrl: './sup-notices.component.html',
  styleUrls: ['./sup-notices.component.css']
})
export class SupNoticesComponent {

  @ViewChild('detalleAnuncio') detalleAnuncio!: MmodalComponent;
  @ViewChild('updatePackage') updatePackage!: MmodalComponent;
  dataAds: any;
  detalleAds: any;
  allPackage: any;
  packageDetail: any;
  idPackage: any;
  idAds: any;
  user_data: any;
  api: string='';
  id: string='';
  token: any;

  constructor(
    library: FaIconLibrary,
    private adminService: AdminServiceService,
    private profileService: ProfileServiceService,
    private router: Router,
    public constante: ConstantsSystem,
    private http: HttpClient,
  ) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getAds();
    this.getPackage();
  

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/admin']);
    }

   
  }

  async getAds() {
    const resp = await lastValueFrom(this.adminService.getAllAds());

    if (resp !== null) {
      this.dataAds = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async detailAds(id:string){
     const resp = await lastValueFrom(this.adminService.getAdsById(id));
     if (resp !== null) {
       this.detalleAds = resp.data;      
       this.idAds=this.detalleAds[0]._id;
       this.detalleAnuncio.abrir();
     } else {
      console.log('no se encontraron datos');
     }
  }

  async declineAds(event:any){
    const state=2;
    const message=event.value.descriptionAds;
    const resp = await lastValueFrom(this.adminService.updateStateAds(this.idAds,message,state));
     if (resp !== null) {
      const message='Tú anuncio de publicidad fue devuelto';
      const resp1 = await lastValueFrom(this.adminService.addNotification(this.id,this.detalleAds[0].id_user,message));
    if (resp1 !== null) {   
      location.reload();
    }

     } else {
      console.log('no se encontraron datos');
     }
  }

  async acceptAds(event:any){
    const message='Anuncio aceptado';
    const state=1;
    const resp = await lastValueFrom(this.adminService.updateStateAds(this.idAds,message,state));
     if (resp !== null) {
      const message='Tú anuncio de publicidad fue validado';
      const resp1 = await lastValueFrom(this.adminService.addNotification(this.id,this.detalleAds[0].id_user,message));
    if (resp1 !== null) {   
      location.reload();
    }

     } else {
      console.log('no se encontraron datos');
     }
  }


  async onRegisterPackage(form:any){
     const resp = await lastValueFrom(this.adminService.registerPaqueteAds(form));

     if (resp !== null) {
       location.reload();
     } else {
       console.log('no se encontraron datos');
     }

  }

  async getPackage()
  {
     const resp = await lastValueFrom(this.adminService.getAllPackage());
     if (resp !== null) {
      this.allPackage = resp.data;
     } else {
       console.log('no se encontraron datos');
     }

  }

  async enablePackage(id:string)
  {
    const state=0;
     const resp = await lastValueFrom(this.adminService.updateStatePackage(id,state));
     if (resp !== null) {
      location.reload();
     } else {
       console.log('no se encontraron datos');
     }

  }

  async disablePackage(id:string)
  {
    const state=1;
    const resp = await lastValueFrom(this.adminService.updateStatePackage(id,state));
    if (resp !== null) {
     location.reload();
    } else {
      console.log('no se encontraron datos');
    }

  }

  async detailPackage(id:string){
    const state=1;
    const resp = await lastValueFrom(this.adminService.getPackageById(id));
    if (resp !== null) {
     this.packageDetail=resp.data[0];
     this.idPackage=this.packageDetail._id;
     this.updatePackage.abrir();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async updatePackageAds(event:any){
    const state=1;
    const resp = await lastValueFrom(this.adminService.updatePackage(this.idPackage,event));
    if (resp !== null) {
     location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

}
