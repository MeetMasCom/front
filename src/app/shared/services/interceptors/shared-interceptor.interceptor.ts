import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { SharedserviceService } from '../sharedservice.service';
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { ConstantsSystem } from 'src/app/utils/constants-system';

@Injectable()
export class SharedInterceptorInterceptor implements HttpInterceptor {
  private countRequest = 0;
  constructor(private sharedLibService: SharedserviceService, public constante: ConstantsSystem
  ) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (!this.countRequest) {
      if (req.url != this.constante.API_SERVER + '/chat/messages')
        this.sharedLibService.setIsloading(true);
    }
    this.countRequest++;


    const token = this.sharedLibService.getToken();
    if (token != null) {
      if (!req.headers.has("service")) {
        req = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${token}`),
        });
      }
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.countRequest--;
        if (!this.countRequest) {
          this.sharedLibService.setIsloading(false);
        }
      }),
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {

        // Token caducado
        if (err.status === 401) {
          if (!req.headers.has("service")) {
            //cerrar sesion
          }
        }

        return throwError(() => err);
      })
    );
  }
}
