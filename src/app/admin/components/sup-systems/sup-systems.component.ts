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
  selector: 'app-sup-systems',
  templateUrl: './sup-systems.component.html',
  styleUrls: ['./sup-systems.component.css'],
})
export class SupSystemsComponent {

  @ViewChild('userVerify') userVerify!: MmodalComponent;
  @ViewChild('detalleSpam') detalleSpam!: MmodalComponent;
  dataUsers: any=[];
  dataUserid: any=[];
  api = '';
  dataSpam: any;
  detailS: any;

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
    this.getUserVerify();
    this.getAllSpam();
    this.api = this.constante.API_IMAGES;
  }

  async getUserVerify() {
    const resp = await lastValueFrom(this.adminService.getUserVerify());

    if (resp !== null) {
      this.dataUsers = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async getAllSpam() {
    const resp = await lastValueFrom(this.adminService.getAllSpam());

    if (resp !== null) {
      this.dataSpam = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  async detailUser(id:string){
    const resp = await lastValueFrom(this.profileService.getUserById(id));
    if (resp !== null) {
      this.dataUserid = resp.data[0];     
     
      this.userVerify.abrir();
    } else {
      //console.log('no se encontraron datos');
    }    
   
  }

  async detailSpam(id:string){
    const resp = await lastValueFrom(this.adminService.getDetailSpam(id));
    if (resp !== null) {
      this.detailS = resp.data;  
      console.log("detalle", this.detailS);        
      this.detalleSpam.abrir();
    } else {
      //console.log('no se encontraron datos');
    }    
  }

  download(doc:string){
   
    this.http.get(this.api+doc, { responseType: 'blob' })
    .subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


  async verificar(event:any){
    const val: boolean=true;
    const resp = await lastValueFrom(this.adminService.verifyUser(event,val));
    if (resp !== null) {     
     location.reload();
    } else {
      console.log('no se encontraron datos');
    }    
  }
}
