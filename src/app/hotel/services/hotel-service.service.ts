import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { Room } from '../interfaces/room';
import { Service } from '../interfaces/service';
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
        price:hotel.price
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
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getByIdHotel/${id}`);
}


getHotelByIdUser(id: string): Observable<any> {
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getByIdUserHotel/${id}`);
}


registerRoom(room:Room,file1:File,valores:string): Observable<any> {
   const fd = new FormData();
    fd.append('hotel_id', room.hotel_id);
    fd.append('number', room.number.toString());
    fd.append('type', room.type);
   fd.append('name', room.name);
    fd.append('dimension', room.dimension);
    fd.append('price', room.price);
    fd.append('description', room.description);
    fd.append('image', file1);
    fd.append('service', valores);

  return this.httpCLient.post(
    `${this.constante.API_SERVER}/room/roomRegister`,fd
  );
}

getRoomHotelById(id: string): Observable<Hotel> {
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/room/getByIdHotelRoom/${id}`);
}


registerServices(service:Service): Observable<any> {
  console.log("servicios",service);
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/service/serviceRegister`,{
      hotel_id:service.hotel_id,
      description:service.description
    }
  );
}

getServicesHotelById(id: string): Observable<Hotel> {
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/service/getByIdHotelService/${id}`);
}

}
