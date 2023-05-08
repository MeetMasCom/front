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

  registerHotel(hotel: Hotel,file:File): Observable<any> {
    console.log(file);
    const fd = new FormData();
    fd.append('user_id', hotel.huser_id);
    fd.append('name', hotel.hname);
    fd.append('address', hotel.haddress);
    fd.append('phone', hotel.hphone);
    fd.append('country', hotel.hcountry);
    fd.append('city', hotel.hcity);
    fd.append('manager', hotel.hmanager);
    fd.append('stars', hotel.hstars.toString());
    fd.append('ruc', hotel.hruc);
    fd.append('web', hotel.hweb);
    fd.append('archivo', file);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/hotel/hotelRegister`,fd
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


registerRoom(room:Room,fd1:any,valores:any): Observable<any> {
console.log(room);
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/room/roomRegister`,{
      hotel_id:room.rhotel_id,
      name:room.rname,
      number:room.rnumber,
      dimension:room.rdimension,
      type:room.rtype,
      description:room.rdescription,
      service:valores,
      photo:fd1,
    }
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

getRoomById(id: string): Observable<Hotel> {
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/room/getRoomById/${id}`);
}

getServiceById(id: string): Observable<Hotel> {
  console.log("id servicio",id);
  return this.httpCLient.get<any>(`${this.constante.API_SERVER}/service/getByIdService/${id}`);
}

registerImage(image:File): Observable<any> { 
  const fd= new FormData();
  fd.append('image',image);
  console.log("imagen servicio",fd.get('image'));
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/room/imagesRegister`,fd
    );
}

}
