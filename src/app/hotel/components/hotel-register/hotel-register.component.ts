import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelServiceService } from 'src/app/hotel/services/hotel-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hotel-register',
  templateUrl: './hotel-register.component.html',
  styleUrls: ['./hotel-register.component.css']
})
export class HotelRegisterComponent {
  constructor(private hotelService: HotelServiceService, private router: Router) {}
id:any;
classA: string = '';message: string = '';
  async ngOnInit() {
 
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  
async onRegister(form: any) {
  try {
    form.value.user_id=this.id;
      const resp = await lastValueFrom(this.hotelService.registerHotel(form.value));
      console.log('resp', resp);    
      //;  
      this.classA = 'alert-success';
      this.message = resp.message;  
      //this.router.navigate(['/fad']); 
      setTimeout(() => {
        location.reload();
      }, 1500);
      
    
  } catch (error: any) {
    this.classA = 'alert-danger';
    this.message = error.error.message;
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
}
}
