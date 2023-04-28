import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { Room } from '../interfaces/room';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
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
        phone: hotel.phone,
        country: hotel.country,
        city: hotel.city,
        manager: hotel.manager,
        stars: hotel.stars,
      }
    );
  }

  getAllHotel(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(`${this.constante.API_SERVER}/hotel`);
  }

  getHotelNoVerified(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(
      `${this.constante.API_SERVER}/hotel/getHotelNoVerified`
    );
  }

  verifyHotel(id: string): Observable<any> {
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/hotel/verifyHotel/${id}`,id);
}

getHotelById(id: string): Observable<Hotel> {
  console.log("servicio",id);
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getByIdHotel/${id}`);
}


getHotelByIdUser(id: string): Observable<any> {
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getByIdUserHotel/${id}`);
}


registerRoom(room: Room): Observable<any> {
  console.log("habitaciones",room);
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/room/roomRegister`,
    {
      hotel_id: room.hotel_id,
      number: room.number,
      type: room.type,
      price: room.price,
      description: [room.description],
      picture: [room.picture]
    }
  );
}

getRoomHotelById(id: string): Observable<Hotel> {
  console.log("servicio",id);
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/room/getByIdHotelRoom/${id}`);
}


}
