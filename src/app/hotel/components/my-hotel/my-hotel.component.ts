import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel} from '../../interfaces/hotel';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { faShield} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css']
})
export class MyHotelComponent {
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('validModal') validModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;
  
  faShield=faShield;
  id_hotel:string ='';
  hotel: any=[];
  room: any=[];
    errMsj: any;
    rating: number=0;
    message: string = '';
  images: any;
  file!: File;
  services: any=[];
  valoresSeleccionados:any = [];
  
    constructor(
      private hotelService: HotelServiceService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public constante: ConstantsSystem
    ) {}
  
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_hotel = params['id'];   
      });

      this.getRoomsByHotelId(this.id_hotel);
      this.getHotel(this.id_hotel);
      this.getServices();
    }
  

    async getHotel(id:string){
      try {
        const response = await lastValueFrom(
          this.hotelService.getHotelById(id)
        );
        if (response.data !== null) {
          this.hotel = response;      
        }
      } catch (error: any) {
        console.log('error', error.error);
        this.errMsj = error.error.message;
      }
    }

     async getRoomsByHotelId(id:string){
      try {
        const response = await lastValueFrom(
          this.hotelService.getRoomHotelById(id)
        );
        if (response.data !== null) {
          this.room = response.data;
        }
      } catch (error: any) {
        console.log('error', error);
      }

     }

    async setRating(val: number) {
      console.log(val);
        this.rating = val;
    }

    onValidate() {
        this.fadModal.abrir();
    }




    async onRegister(event:any){

      try {
        const formData = new FormData();  
        for (let i = 0; i < this.images.length; i++) {
          formData.append('images', this.images[i]);
        }
        this.file = <File>event.target.files[0];
        event.value.hotel_id = this.id_hotel;
        const resp = await lastValueFrom(
          this.hotelService.registerRoom(event.value, this.file,this.valoresSeleccionados)
        );
  
        this.router.navigate(['/myHotel', this.id_hotel]);
        this.validModal.abrir();
      } catch (error: any) {
        console.log('error', error.error);
        this.errorModal.abrir();
      }

    }

    onRefresh(){
      location.reload();
    }


    async registerServices(form:any){
      try{
        form.value.hotel_id=this.id_hotel;
        console.log("formulario",form.value);
        const resp = await lastValueFrom(
          this.hotelService.registerServices(form.value)
        );
        location.reload();
      }catch (error: any) {
        console.log('error', error.error);        
      }
      
    }

    async getServices(){
      try{
        const resp = await lastValueFrom(
          this.hotelService.getServicesHotelById(this.id_hotel));
          if (resp.data !== null) {
            this.services = resp.data;
          }
      }catch (error: any) {
        console.log('error', error.error);        
      }
      
    }


    async onForm(event:any){
      try {
        console.log(event);
        const formData = new FormData();
          event.value.hotel_id = this.id_hotel;
          console.log(event.value);
        const resp = await lastValueFrom(this.hotelService.registerRoom(event.value, this.file, this.valoresSeleccionados)
        );
        this.message = resp.message;
        this.correctModal.abrir();
        this.router.navigate(['/myHotel', this.id_hotel]);
      } catch (error: any) {
        this.errorModal.abrir();
      }
    }

    selectCheck(event:any){
      const index = this.valoresSeleccionados.indexOf(event);
      if (index === -1) {
        this.valoresSeleccionados.push(event);
      } else {
        this.valoresSeleccionados.splice(index, 1);
      }
      console.log(this.valoresSeleccionados);
    }

    cargarImagen(event:any){
      this.file = <File>event.target.files[0];
      console.log(this.file);
    }

}
