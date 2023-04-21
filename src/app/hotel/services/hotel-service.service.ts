import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) {}

  registerHotel(hotel: Hotel): Observable<any> {
    console.log(hotel);
    return this.httpCLient.post(
     
      `${this.constante.API_SERVER}/hotel/hotelRegister`,
      {
        user_id: hotel.user_id,
        name: hotel.name,
        address: hotel.address,
        phone:hotel.phone,
        country:hotel.country,
        city:hotel.city,
        manager:hotel.manager,
        stars:hotel.stars
      }
    );
  }


  getAllHotel(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(`${this.constante.API_SERVER}/hotel`);
  }

  
  getHotelNoVerified(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(`${this.constante.API_SERVER}/hotel/getHotelNoVerified`);
  }


}
