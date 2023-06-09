import { Component, ViewChild } from '@angular/core';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Fad } from '../../interfaces/fad';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { MmodalComponent } from '../../../shared/components/mmodal/mmodal.component';
import { HotelServiceService } from 'src/app/hotel/services/hotel-service.service';

@Component({
  selector: 'app-start-fad',
  templateUrl: './start-fad.component.html',
  styleUrls: ['./start-fad.component.css'],
})
export class StartFadComponent {
  @ViewChild('warningModal') warningModal!: ModalAlertsComponent;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;
  @ViewChild('correctModal') correctModal!: ModalAlertsComponent;
  @ViewChild('errorModal') errorModal!: ModalAlertsComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;

  fad: any = [];
  fadM: any = [];
  api = '';

  classA: string = '';
  message: string = '';
  photoSelected: any;
  file!: File;

  user_id!: string;
  name!: string;
  description!: string;
  id: any;
  user_data: any = [];
  estado = -1;
  fadData: any = [];

  constructor(
    private fadService: FadServiceService,
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
      await this.getAllsFad();
      await this.getMyFad();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getAllsFad() {
    this.fadService.getFads().subscribe((res) => {
      if (res != null) {
        this.fad = res.data;
      }
    });
  }

  async getMyFad() {
    this.fadService.getFadIdUser(this.id).subscribe((res) => {
      if (res != null) {
        this.fadM = res.data;
      }
    });
  }

  selectedFad(id: string) {
    this.router.navigate(['/commentFad', id]);
  }

  onValidate() {
    this.user_data.state.forEach((element: any, index: any) => {
      if (
        this.user_data.state[index] === 0 &&
        this.user_data.state.length === 1
      ) {
        this.estado = 0;
        this.warningModal.abrir();
      }
      if (
        this.user_data.state[index] === 1 ||
        this.user_data.state[index] !== 0
      ) {
        this.fadModal.abrir();
      }
    });
  }

  onRefresh() {
    location.reload();
  }

  onRedirigir() {
    this.router.navigate(['/dataUser', this.estado]);
  }

  async onForm(event: any) {
    try {
      this.description = event.value.description;
      this.name = event.value.name;
      const resp = await lastValueFrom(
        this.fadService.register(
          this.id,
          this.name,
          this.description,
          this.file
        )
      );
      this.classA = 'alert-success';
      this.message = resp.message;
      this.router.navigate(['/fad']);
      this.message = resp.message;
      this.correctModal.abrir();
    } catch (error: any) {
      this.message = error.error.message;
      this.errorModal.abrir();
    }
  }

  cargarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  getImageType(signature: string) {
    switch (signature) {
      case '89504E47':
        return 'images/png';
      default:
        return 'Unknown filetype';
    }
  }
}
