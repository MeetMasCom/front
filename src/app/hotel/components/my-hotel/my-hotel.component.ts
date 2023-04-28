import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel} from '../../interfaces/hotel';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';


@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css']
})
export class MyHotelComponent {
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  
  id_hotel:string ='';
  hotel: any=[];
  room: any=[];
    errMsj: any;
    rating: number=0;
  
    constructor(
      private hotelService: HotelServiceService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public constante: ConstantsSystem
    ) {}
  
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_hotel = params['id'];
  
          console.log("id hotel",this.id_hotel);
        try {
          const response = await lastValueFrom(
            this.hotelService.getHotelById(this.id_hotel)
          );
          if (response.data !== null) {
            this.hotel = response;
            console.log(this.hotel);
          }
        } catch (error: any) {
          console.log('error', error.error);
          this.errMsj = error.error.message;
        }
  
  
        
      });
      this.getRoomsByHotelId(this.id_hotel);
      
    }
  

     async getRoomsByHotelId(id:string){
      try {
        const response = await lastValueFrom(
          this.hotelService.getRoomHotelById(id)
        );
        if (response.data !== null) {
          this.room = response.data;
          console.log("rooms",this.room);
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

    async onRegisterRoom(form: any) {
      try {
        form.value.id_hotel=this.id_hotel;
          const resp = await lastValueFrom(this.hotelService.registerRoom(form.value));
          console.log('resp', resp);          
      } catch (error: any) {
        console.log('error', error.error);
      }
    }
}
