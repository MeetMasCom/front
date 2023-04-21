import { Component } from '@angular/core';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent {

  hotel: any = [];
  api = '';
  classA: string = '';
  message: string = '';
  user_id!: string;
  id: any;
  
  constructor(
    private hotelService: HotelServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {}

  async ngOnInit() {

    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if(this.id!=null){
      this.api = this.constante.API_IMAGES;
      await this.getAllsHotel();
    }else{
      this.router.navigate(['/inicio']);
    }
        
  }

  async getAllsHotel() {
    this.hotelService.getAllHotel().subscribe((res) => {
      if (res != null) {
        this.hotel = res.data;
      }
    });
  }


}
