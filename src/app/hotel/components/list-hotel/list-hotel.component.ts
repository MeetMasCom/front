import { Component, ViewChild } from '@angular/core';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css'],
})

export class ListHotelComponent {
  @ViewChild('warningModal') warningModal!: ModalAlertsComponent;
  @ViewChild('ValidateH') ValidateH!: MmodalComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  @ViewChild('datavalidModal') datavalidModal!: ModalAlertsComponent;
  @ViewChild('validModal') validModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('RegisterP') RegisterP!: MmodalComponent;
  @ViewChild('ChangeP') ChangeP!: MmodalComponent;
  @ViewChild('dataPoliciesModal') dataPoliciesModal!: ModalAlertsComponent;
  
  

  user_data: any = [];
  hotel: any = [];
  api = '';
  classA: string = '';
  message: string = '';
  hotel_id!: string;
  id: any;
  faStar = faStar;
  hotelUser: any = [];
  estado = -1;
  hotelId: any = [];
  errMsj: any;
  rating: number = 0;
  selectedFile!: File;
  dataHotel: any;
 policies : any = [];
comment:any;
 id_Policies:any;

  constructor(
    private hotelService: HotelServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {}

  async ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
      this.api = this.constante.API_IMAGES;
      await this.getAllsHotel();
    } else {
      this.router.navigate(['/inicio']);
    }
    this.hotelbyUser(this.id);
  }

  async getAllsHotel() {
    this.hotelService.getAllHotel().subscribe((res) => {
      if (res != null) {
        this.hotel = res.data;
      }
    });
  }


  async getPoliciesByHotel(id:string) {
    try {
      const response = await lastValueFrom(
        this.hotelService.getPoliciesIdHotel(id)
      );
      if (response.data !== null) {
        //console.log("politicas",response.data[0].policies);
        this.policies = response.data[0];
        this.comment=response.data[0].comment;
        this.id_Policies=response.data[0]._id;
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
  async hotelbyUser(id: string) {
    const response = await lastValueFrom(
      this.hotelService.getHotelByIdUser(id)
    );
    if (response.data !== null) {
      this.hotelUser = response.data;
      console.log('hoteles por user', this.hotelUser);
    }
  }

  onValidate() {
    this.user_data.state.forEach((element: any, index: any) => {
      if (this.user_data.state[index] !== 2) {
        this.estado = 1;
      }
      if (this.user_data.state[index] === 2) {
        this.estado = 0;
      }
    });

    if (this.estado === 1) {
      this.estado = 1;
      this.warningModal.abrir();
    }
    if (this.estado === 0) {
      this.fadModal.abrir();
    }
  }

  onRedirigir() {
    this.router.navigate(['/dataUser', this.estado]);
  }

  onRefresh() {
    location.reload();
  }

  onComplete() {
    this.ValidateH.abrir();
  }

  async myHotel(id: string) {
    try {
      this.hotel_id = id;
      this.getPoliciesByHotel(id);
      const response = await lastValueFrom(this.hotelService.getHotelById(id));
      if (response.data !== null) {
        this.dataHotel = response.data[0];
        this.hotelId = response.data;

        if (this.dataHotel.state === 0) {
          this.datavalidModal.abrir();

        } 
        if (this.dataHotel.state === 1) {
          this.dataHotel = response.data[0];
         this.RegisterP.abrir();
        } 
        if (this.dataHotel.state === 2) {
          this.dataHotel = response.data[0];
          this.ValidateH.abrir();
        }
        if (this.dataHotel.state === 3) {
          this.router.navigate(['/myHotel', id]);
        }
        if (this.dataHotel.state === 4) {
         this.ChangeP.abrir();
        }
        if (this.dataHotel.state === 5) {
          this.dataPoliciesModal.abrir();
        }
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async registerPolicies(event: any) {
    try {
      const response = await lastValueFrom(this.hotelService.PoliciesHotel(this.hotel_id,event));
      if (response.data !== null) {
        this.hotelId = response.data;
        const state=5;
      const resp = await lastValueFrom(
        this.hotelService.updateState(this.hotel_id,state)
      );
      if (resp.data !== null) {
        this.message = response.message;
        location.reload();
      }
      
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async selectedHotel(id: string) {
    try {
      const response = await lastValueFrom(this.hotelService.getHotelById(id));
      if (response.data !== null) {
        this.hotelId = response.data;
        this.router.navigate(['/hotelDetail', id]);
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async setRating(val: number) {
    console.log(val);
    this.rating = val;
  }

  async onFormHotel(event: any) {
    try {
      event.value.huser_id = this.id;
      const resp = await lastValueFrom(
        this.hotelService.registerHotel(event.value, this.selectedFile)
      );
      console.log('resp', resp);
      this.message = resp.message;
      this.validModal.abrir();
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }

  onDoc(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async updateHotel(event: any) {
    try {
      event.value.mhuser_id = this.id;
      const resp = await lastValueFrom(
        this.hotelService.updateHotel(
          this.hotel_id,
          event.value,
          this.selectedFile
        )
      );
      console.log('resp', resp);
      this.message = resp.message;
      this.validModal.abrir();
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }


  async updateP(event:any){
    try {

      console.log('formulario politicas', event.value);
      const policie1 = event.value.upolicies1;
      const policie2 = event.value.upolicies2;
      const response = await lastValueFrom(
        this.hotelService.UpdatePoliciesHotel(this.id_Policies, event)
      );
      if (response.data !== null) {
        console.log('politicas actualizadas');

        const state=5;
        const resp = await lastValueFrom(
          this.hotelService.updateState(this.hotel_id,state)
        );
        if (resp.data !== null) {
          this.message = response.message;
        }

        //location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}
