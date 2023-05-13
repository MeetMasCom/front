import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent {
  @ViewChild('fadModalH') fadModalH!: MmodalComponent;

  id_hotel: string = '';
  hotel: any = [];
  services: any = [];
  errMsj: any;
  room: any;
  serviceRoom:any;
  roomDetail: any = [];
  roomD: any = [];
  rating: number = 0;
  faShield = faShield;
  api = '';
  id:any;
  photo: any = [];
  servicesR:any=[];
  constructor(
    private hotelService: HotelServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if(this.id!=null){
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_hotel = params['id'];
        this.getHotelById();
        
      });
  
      this.getRoomsByHotelId(this.id_hotel);
      this.getServices();
    }else{
      this.router.navigate(['/inicio']);
    }


   
  }


  async getHotelById(){
  try {
    const response = await lastValueFrom(
      this.hotelService.getHotelById(this.id_hotel)
    );
    if (response.data !== null) {
      this.hotel = response;
      //console.log(this.hotel);
    }
  } catch (error: any) {
    console.log('error', error.error);
    this.errMsj = error.error.message;
  }
}

  async getRoomsByHotelId(id: string) {
    try {
      const response = await lastValueFrom(
        this.hotelService.getRoomHotelById(id)
      );
      if (response.data !== null) {
        this.room = response.data;
        //console.log('rooms', this.room);
      }
    } catch (error: any) {
      console.log('error', error);
    }
  }

  async setRating(val: number) {
    //console.log(val);
    this.rating = val;
  }

  async detalle(id:string) {
    // const resp = await 
    //   this.hotelService.getRoomById(id).toPromise() 
    const resp = await lastValueFrom(
      this.hotelService.getRoomById(id)
    );
    
    if (resp?.data.length >0) {
      console.log("datos",resp?.data[0])
      this.roomDetail = resp?.data;
      this.roomD=resp?.data[0];
      this.photo=resp?.data[0].photo;
      this.serviceRoom=this.roomD.service;
    }
    console.log("roomD",this.roomD);
    console.log("todos los servicios",this.serviceRoom);
    this.getServiceById();    
    this.fadModalH.abrir();
  }


   async getServiceById(){
    try {
        console.log("obtener servicio");
        console.log(this.serviceRoom.length);
      for (let i = 0; i < this.serviceRoom.length; i++) {
        console.log("entra al for");
        const resp = await lastValueFrom(this.hotelService.getServiceById(this.serviceRoom[i]));
        this.servicesR.push(resp.data);
        console.log("i ciclo for",i);
      }  
      console.log("servicios luego del for",this.servicesR);
    } catch (error: any) {
      console.log("sale por el catch");
      console.log('error', error.error);
    }
   }

  async getServices() {
    try {
      const resp = await lastValueFrom(
        this.hotelService.getServicesHotelById(this.id_hotel)
      );
      if (resp.data !== null) {
        this.services = resp.data;
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}
