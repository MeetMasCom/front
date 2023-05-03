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
  @ViewChild('fadModal') fadModal!: MmodalComponent;

  id_hotel: string = '';
  hotel: any = [];
  services: any = [];
  errMsj: any;
  room: any = [];
  rating: number = 0;
  faShield = faShield;

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

    this.getRoomsByHotelId(this.id_hotel);
    this.getServices();
  }

  async getRoomsByHotelId(id: string) {
    try {
      const response = await lastValueFrom(
        this.hotelService.getRoomHotelById(id)
      );
      if (response.data !== null) {
        this.room = response.data;
        console.log('rooms', this.room);
      }
    } catch (error: any) {
      console.log('error', error);
    }
  }

  async setRating(val: number) {
    console.log(val);
    this.rating = val;
  }

  detalle() {
    this.fadModal.abrir();
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
