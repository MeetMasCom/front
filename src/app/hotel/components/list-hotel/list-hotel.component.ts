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
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent {
  @ViewChild('warningModal') warningModal!: ModalAlertsComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  user_data: any = [];
  hotel: any = [];
  api = '';
  classA: string = '';
  message: string = '';
  user_id!: string;
  id: any;
  faStar=faStar;
  hotelUser:any =[];

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
    if(this.id!=null){
      this.api = this.constante.API_IMAGES;
      await this.getAllsHotel();
    }else{
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

 async hotelbyUser(id:string){
  const response = await lastValueFrom(
    this.hotelService.getHotelByIdUser(id)
  );
  if (response.data !== null) {
   this.hotelUser=response.data;
   console.log("hoteles por user",this.hotelUser);
  }
 }



  onValidate() {
    if (this.user_data.state === 0) {
      this.warningModal.abrir();
    }
    if (
      this.user_data.state === 1 ||
      this.user_data.state === 2 ||
      this.user_data.state === 3
    ) {
      this.fadModal.abrir();
    }
  }
  
  onRedirigir() {
    this.router.navigate(['/dataUser']);
  }


}
