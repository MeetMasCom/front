import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FadServiceService } from 'src/app/fad/services/fad-service.service';
import { HotelServiceService } from 'src/app/hotel/services/hotel-service.service';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-mmodal',
  templateUrl: './mmodal.component.html',
  styleUrls: ['./mmodal.component.css'],
})
export class MmodalComponent {
  @Input() idModal: string = '';
  @Input() title = '';
  @Input() tipo = 0;
  @Input() val: string = '';
  @ViewChild('modalPublicar') modalPublicar!: ElementRef;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;
  @ViewChild('failModal') failModal!: ModalAlertsComponent;

  photoSelected: any;
  file!: File;
  classA: string = '';
  message: string = '';
  user_id!: string;
  name!: string;
  description!: string;
  id: any;
  fadData: any;
  id_hotel: any;

  constructor(
    private fadService: FadServiceService,
    private hotelService: HotelServiceService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  abrir() {
    this.modalPublicar.nativeElement.click();
  }

  onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const allowFiles = ['images/png'];
      const fi = event.target.files[0];
      const re = new FileReader();
      const readerBase64 = new FileReader();

      re.readAsArrayBuffer(fi);
      re.onload = (evt) => {
        const result = evt.target?.result as ArrayBuffer;
        const uInt = new Uint8Array(result.slice(0, 4));
        const bytes: string[] = [];
        uInt.forEach((val) => {
          bytes.push(val.toString(16));
        });
        const hexa = bytes.join('').toUpperCase();
        const filterFileTypes = allowFiles.filter(
          (val) => val === this.getImageType(hexa)
        );

        if (filterFileTypes.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => (this.photoSelected = reader.result);
          reader.readAsDataURL(this.file);
        } else {
          this.classA = 'alert-danger';
          this.message = 'Imagen no permitida';
          event.target.value = '';
          this.photoSelected = '';
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      };

      //image preview
    } else {
      console.log('seleccione una foto');
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

  async onRegister(form: any) {
    try {
      this.description = form.value.description;
      this.name = form.value.name;
      const fd = new FormData();
      this.fadData = {
        user_id: this.id,
        name: form.value.name,
        description: form.value.description,
        image: this.file,
      };
      const resp = await lastValueFrom(
        this.fadService.register(
          this.id,
          this.name,
          this.description,
          this.file
        )
      );
      console.log('resp', resp);
      //;
      this.classA = 'alert-success';
      this.message = resp.message;
      this.router.navigate(['/fad']);
      this.message = resp.message;
      this.exitoModal.abrir();
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.failModal.abrir();
    }
  }

  async onRegisterHotel(form: any) {
    try {
      form.value.user_id = this.val;
      const resp = await lastValueFrom(
        this.hotelService.registerHotel(form.value)
      );
      console.log('resp', resp);
      this.message = resp.message;
      this.exitoModal.abrir();
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.failModal.abrir();
    }
  }

  onRedirigir() {
    //this.router.navigate(['/hotel']);
    location.reload();
  }

  onFail() {
    location.reload();
  }

  async onRegisterRoom(form: any) {
    try {
      form.value.hotel_id = this.val;
      console.log(form.value);
      const resp = await lastValueFrom(
        this.hotelService.registerRoom(form.value)
      );
      console.log('resp', resp);
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}
