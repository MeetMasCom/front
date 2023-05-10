import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { HotelServiceService } from '../../services/hotel-service.service';
import { lastValueFrom } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { HttpClient } from '@angular/common/http';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verify-hotel',
  templateUrl: './verify-hotel.component.html',
  styleUrls: ['./verify-hotel.component.css'],
})
export class VerifyHotelComponent {
  @ViewChild('detalleHotel') detalleHotel!: MmodalComponent;
  @ViewChild('rechazarHotel') rechazarHotel!: MmodalComponent;
  @ViewChild('exitModal') exitModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('cModal') cModal!: ModalAlertsComponent;

  hotel: any = [];
  api = '';
  classA: string = '';
  message: string = '';
  user_id!: string;
  id: any;
  id_hotel: any;
  dataHotel: any;
  pdf: any;
  faFile=faFile;
  constructor(
    private hotelService: HotelServiceService,
    private router: Router,
    public constante: ConstantsSystem,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
      this.api = this.constante.API_IMAGES;
      await this.getHotelNoVerify();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getHotelNoVerify() {
    this.hotelService.getHotelNoVerified().subscribe((res) => {
      if (res != null) {
        this.hotel = res.data;
        console.log(this.hotel);
      }
    });
  }

  async detalleh(_id: string) {
    try {
      this.id_hotel = _id;
      const response = await lastValueFrom(this.hotelService.getHotelById(_id));
      if (response.data !== null) {
        this.dataHotel = response.data[0];
        this.detalleHotel.abrir();
        this.pdf=this.dataHotel.doc;        
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async validateHotel(event: any) {
    try {
      console.log(event);
      const response = await lastValueFrom(
        this.hotelService.verifyHotel(event)
      );
      if (response.data !== null) {
        this.message = response.message;
        this.exitModal.abrir();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errorModal.abrir();
    }
  }

  async declineHotel(event: any) {
    try {      
      this.rechazarHotel.abrir();
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  downloadPDF(event:any){
    console.log(event);
    this.http.get(this.api+this.pdf, { responseType: 'blob' })
    .subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


  async detailhotel(_id: string) {
    try {
      this.id_hotel = _id;
      const response = await lastValueFrom(this.hotelService.getHotelById(_id));
      if (response.data !== null) {
        this.dataHotel = response.data[0];
        this.pdf=this.dataHotel.doc;        
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async commetDecline(event:any){
     try {
      console.log(event.value);
      const response = await lastValueFrom(this.hotelService.commentHotel(this.id_hotel,event.value));
      if (response.data !== null) {
        console.log(event);
       const resp = await lastValueFrom(
         this.hotelService.declineHotel(this.id_hotel)
       );
       if (resp.data !== null) {
        this.message = resp.message;
         //this.rechazarHotel.abrir();
         //location.reload();
         this.cModal.abrir();
       }
          
      }
    } catch (error: any) {
      console.log('error', error.error);
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



  onRefresh(){
    location.reload();
  }
}
