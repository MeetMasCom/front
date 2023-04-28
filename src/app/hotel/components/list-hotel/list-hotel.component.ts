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
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  user_data: any = [];
  hotel: any = [];
  api = '';
  classA: string = '';
  message: string = '';
  user_id!: string;
  id: any;
  faStar = faStar;
  hotelUser: any = [];
  estado = -1;
  hotelId: any = [];
  errMsj: any;
  rating: number=0;

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

  onRefresh(){
    location.reload()
  }

  async myHotel(id: string) {
    try {
      const response = await lastValueFrom(this.hotelService.getHotelById(id));
      if (response.data !== null) {
        this.hotelId = response.data;
        if (this.hotelId[0].state === 1) {
          this.router.navigate(['/myHotel', id]);
        } else if (this.hotelId[0].state === 0) {
          this.correctModal.abrir();
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
    

}
