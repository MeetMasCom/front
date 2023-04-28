import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel} from '../../interfaces/hotel';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent {

id_hotel:string ='';
hotel: any=[];
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
    
  }

  async setRating(val: number) {
    console.log(val);
      this.rating = val;
  }

}
