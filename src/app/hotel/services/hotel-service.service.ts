import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { Room } from '../interfaces/room';
import { Service } from '../interfaces/service';
import { ConstantsSystem } from '../../utils/constants-system';
import { Form } from '@angular/forms';
import { typeRoom } from '../interfaces/typeRoom';

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
    fd.append('detalle', hotel.hdetalle);
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

  getHotelVerified(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(
      `${this.constante.API_SERVER}/hotel/getHotelVerified`
    );
  }

  getHotels(): Observable<any> {
    return this.httpCLient.get<Hotel[]>(
      `${this.constante.API_SERVER}/hotel/getHotels`
    );
  }


verifyHotel(id: string): Observable<any> {
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/hotel/verifyHotel/${id}`,id);
}

declineHotel(id: string): Observable<any> {
  return this.httpCLient.post<any>(`${this.constante.API_SERVER}/hotel/declineHotel/${id}`,id);
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


registerServices(form:any): Observable<any> {
  console.log("servicios",form);
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/service/serviceRegister`,{
      hotel_id:form.hotel_id,
      description:form.hdescription
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
  return this.httpCLient.post(
    `${this.constante.API_SERVER}/room/imagesRegister`,fd
    );
}

registerPriceRoom(id: string, form:any): Observable<any> {
  console.log("precio servicio",form);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/room/registerPrice/${id}`,{
        price:form.precio,
        description:form.description
      }
    );
  }

  updateActualPriceRoom(id: string, val:any): Observable<any> {

      return this.httpCLient.post(        
        `${this.constante.API_SERVER}/room/updatePrice/${id}`,{
          actualPrice:val
        }
      );
    }


    commentHotel(id:string,form:any): Observable<any> {
      console.log(form.hcomentario);
      console.log(id);
        return this.httpCLient.post(
          `${this.constante.API_SERVER}/hotel/commentHotel/${id}`,{
            comment:form.hcomentario
          }
        );
      }

    getTypeRoomByIdHotel(id: string): Observable<Hotel> {
      return this.httpCLient.get<any>(`${this.constante.API_SERVER}/type/getTypeHotelId/${id}`);
    }

    registerTypeRoom(type:typeRoom): Observable<any> {     
      console.log(type);
      return this.httpCLient.post(
        `${this.constante.API_SERVER}/type/typeRoomRegister`,{
          hotel_id:type.thotel_id,
          description:type.tdescription,
          name:type.tname
        }
      );
    }

    updateHotel(id:string,form:any,file:File): Observable<any> {
      console.log(file);
      console.log(form);
      const state=0;
      const fd = new FormData();
      
      return this.httpCLient.post(
        `${this.constante.API_SERVER}/hotel/updateHotel/${id}`,{
          user_id:form.mhuser_id,
         name:form.mhname,
          address:form.mhaddress,
          phone:form.mhphone,
         country:form.mhcountry,
         city:form.mhcity,
          manager:form.mhmanager,
          stars:form.mhstars,
          ruc:form.mhruc,
          web:form.mhweb ,
          detail: form.mhdetalle,
          state:state,
         archivo:file
        }
      );
    }

    PoliciesHotel(id:string,form:any): Observable<any> {
      console.log("servicio",form.value);
        return this.httpCLient.post(
          `${this.constante.API_SERVER}/hotel/policies/`,{
            hotel_id:id,
            policies:[form.value.policies1,
                      form.value.policies2]

          }
        );
    }

    UpdatePoliciesHotel(id:string,form:any): Observable<any> {
      console.log("servicio",form.value);
      console.log("id",id);
        return this.httpCLient.post(
          `${this.constante.API_SERVER}/hotel/updatePolicies/${id}`,{
            policies:[form.value.upolicies1,
                      form.value.upolicies2]
          }
        );
    }

    getPoliciesIdHotel(id: string): Observable<Hotel> {
      return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getByIdPolicies/${id}`);
    }

    commentPolicies(id:string,form:any): Observable<any> {
      console.log(form.pcomentario);
      console.log(id);
        return this.httpCLient.post(
          `${this.constante.API_SERVER}/hotel/commentPolicies/${id}`,{
            comment:form.pcomentario,
            state:2
          }
        );
      }


      verifyPolicies(id: string): Observable<any> {
        return this.httpCLient.post<any>(`${this.constante.API_SERVER}/hotel/verifyPolicies/${id}`,id);
    }


    updateState(id: string,state:number): Observable<any> {
      return this.httpCLient.post<any>(`${this.constante.API_SERVER}/hotel/updateState/${id}`,
      {state:state});
  }
}
