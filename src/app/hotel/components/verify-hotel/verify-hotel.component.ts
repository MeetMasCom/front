import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { HotelServiceService } from '../../services/hotel-service.service';

@Component({
  selector: 'app-verify-hotel',
  templateUrl: './verify-hotel.component.html',
  styleUrls: ['./verify-hotel.component.css']
})
export class VerifyHotelComponent {

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
      await this.getHotelNoVerify();
    }else{
      this.router.navigate(['/inicio']);
    }
        
  }

  async getHotelNoVerify() {
    this.hotelService.getHotelNoVerified().subscribe((res) => {
      if (res != null) {
        this.hotel = res.data;
      }
    });
  }
}
