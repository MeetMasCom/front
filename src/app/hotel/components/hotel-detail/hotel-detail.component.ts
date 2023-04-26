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

  constructor(
    private hotelService: HotelServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id_hotel = params['id'];
      this.hotelService.getHotelById(this.id_hotel).subscribe((res) => {
        if (res != null) {
          this.hotel = res;
        }
      });

      
    });
    
  }


}
