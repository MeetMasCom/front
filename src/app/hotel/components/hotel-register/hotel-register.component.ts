import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotelServiceService } from 'src/app/hotel/services/hotel-service.service';
import { lastValueFrom } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-hotel-register',
  templateUrl: './hotel-register.component.html',
  styleUrls: ['./hotel-register.component.css']
})
export class HotelRegisterComponent {
  constructor(private hotelService: HotelServiceService, private router: Router) {}
  @ViewChild('warningModal') warningModal!: ModalAlertsComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;
id:any;
user_data: any = [];
classA: string = '';message: string = '';
  async ngOnInit() {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  
// async onRegister(form: any) {
//   try {
//     form.value.user_id=this.id;
//       const resp = await lastValueFrom(this.hotelService.registerHotel(form.value));
//       console.log('resp', resp);    
//       //;  
//       this.classA = 'alert-success';
//       this.message = resp.message;  
//       //this.router.navigate(['/fad']); 
//       setTimeout(() => {
//         location.reload();
//       }, 1500);
      
    
//   } catch (error: any) {
//     this.classA = 'alert-danger';
//     this.message = error.error.message;
//     setTimeout(() => {
//       location.reload();
//     }, 1500);
//   }
// }

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
