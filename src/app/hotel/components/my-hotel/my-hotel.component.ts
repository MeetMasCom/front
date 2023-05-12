import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css'],
})
export class MyHotelComponent {
  @ViewChild('fadModalH') fadModalH!: MmodalComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;
  @ViewChild('detalleModal') detalleModal!: MmodalComponent;
  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('validModal') validModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;

  faShield = faShield;
  id_hotel: string = '';
  hotel: any = [];
  room: any = [];
  errMsj: any;
  rating: number = 0;
  message: string = '';
  images: any;
  file!: File;
  services: any = [];
  valoresSeleccionados: any = [];
  api = '';
  id: any;
  selectedFiles!: [];
  roomDetail: any = [];
  photo: any = [];
  price: any = [];
  roomD: any = [];
  servicesR: any = [];
  serviceRoom: any = [];
  filesToUpload!: Array<File>;
  policies: any=[];
  selectedRadio: string = '';
  idRoom: any;
  typeRoom: any;

  @ViewChild('myTabs') myTabs: any;
  id_Policies: any;
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
    if (this.id != null) {
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_hotel = params['id'];
        this.getRoomsByHotelId(this.id_hotel);
        this.getHotel(this.id_hotel);
        this.getServices();
        this.getTypeRoom();
        this.getPoliciesByHotel();
      });
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async detalleh(id: string) {
    this.idRoom = id;
    const resp = await lastValueFrom(this.hotelService.getRoomById(id));

    if (resp?.data.length > 0) {
      this.roomDetail = resp?.data;
      this.roomD = resp?.data[0];
      this.photo = resp?.data[0].photo;
      this.price = resp?.data[0].price;
      this.serviceRoom = this.roomD.service;
    }
    this.getServiceById();
    this.fadModalH.abrir();
  }

  async getServiceById() {
    try {
      for (let i = 0; i < this.serviceRoom.length; i++) {
        const resp = await lastValueFrom(
          this.hotelService.getServiceById(this.serviceRoom[i])
        );
        this.servicesR.push(resp.data);
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getHotel(id: string) {
    try {
      const response = await lastValueFrom(this.hotelService.getHotelById(id));
      if (response.data !== null) {
        this.hotel = response.data[0];
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

  onRefresh() {
    location.reload();
  }

  async registerServices(form: any) {
    try {
      form.value.hotel_id = this.id_hotel;
      const resp = await lastValueFrom(
        this.hotelService.registerServices(form.value)
      );
      location.reload();
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getServices() {
    try {
      this.selectedRadio;
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

  async getTypeRoom() {
    try {
      const resp = await lastValueFrom(
        this.hotelService.getTypeRoomByIdHotel(this.id_hotel)
      );
      if (resp.data !== null) {
        this.typeRoom = resp.data;
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async onFormRegisterRoom(event: any) {
    try {
      event.value.rhotel_id = this.id_hotel;
      const ruta: any = [];

      for (let i = 0; i < this.selectedFiles.length; i++) {
        const resp = await lastValueFrom(
          this.hotelService.registerImage(this.selectedFiles[i])
        );
        ruta.push(resp.data);
      }

      const resp = await lastValueFrom(
        this.hotelService.registerRoom(
          event.value,
          ruta,
          this.valoresSeleccionados
        )
      );
      this.message = resp.message;
      this.correctModal.abrir();
      this.router.navigate(['/myHotel', this.id_hotel]);
    } catch (error: any) {
      this.errorModal.abrir();
    }
  }

  selectCheck(event: any) {
    const index = this.valoresSeleccionados.indexOf(event);
    if (index === -1) {
      this.valoresSeleccionados.push(event);
    } else {
      this.valoresSeleccionados.splice(index, 1);
    }
  }

  cargarImagen(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    this.selectedFiles = event.target.files;
  }

  async onFormRegisterPrice(event: any) {
    try {
      console.log(event.value);
      const response = await lastValueFrom(
        this.hotelService.registerPriceRoom(this.idRoom, event.value)
      );
      if (response.data !== null) {
        this.room = response.data;
      }
      location.reload();
    } catch (error: any) {
      console.log('error', error);
    }
  }

  async selectPrice(event: any) {
    try {
      console.log(event);
      const response = await lastValueFrom(
        this.hotelService.updateActualPriceRoom(this.idRoom, event)
      );
      location.reload();
    } catch (error: any) {
      console.log('error', error);
    }
  }

  async registerType(form: any) {
    try {
      form.value.thotel_id = this.id_hotel;
      const resp = await lastValueFrom(
        this.hotelService.registerTypeRoom(form.value)
      );
      //this.router.navigate(['/myHotel', this.id_hotel]);
      //#pills-otherService
      location.reload();
      this.myTabs.selectedIndex = 1;
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  selectType($event: any) {}

  async onPoliciesH(form: any) {
    try {
      console.log('formulario', form.value);
      const policie1 = form.value.policies1;
      const policie2 = form.value.policies2;
      console.log('1', policie1);
      console.log('2', policie2);
      const response = await lastValueFrom(
        this.hotelService.PoliciesHotel(this.id_hotel, form)
      );
      if (response.data !== null) {
        console.log('se registro las politicas');
        location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async onUpdatePoliciesH(form: any) {
    try {

      console.log('formulario', form.value);
      const policie1 = form.value.policies1;
      const policie2 = form.value.policies2;
      console.log('1', policie1);
      console.log('2', policie2);
      const response = await lastValueFrom(
        this.hotelService.UpdatePoliciesHotel(this.id_Policies, form)
      );
      if (response.data !== null) {
        console.log('politicas actualizadas');
        location.reload();
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }


  async getPoliciesByHotel() {
    try {
      const response = await lastValueFrom(
        this.hotelService.getPoliciesIdHotel(this.id_hotel)
      );
      if (response.data !== null) {
        console.log("politicas",response.data);
        this.policies = response.data[0].policies;
        this.id_Policies=response.data[0]._id;
        console.log(this.policies);
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}
