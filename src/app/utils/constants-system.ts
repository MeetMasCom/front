import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsSystem {
  API_LOCAL: string = '';
  API_SERVER: string = '';
  API_IMAGES: string = '';

  constructor() {
    this.API_LOCAL = 'http://localhost:8000/api';

    this.API_SERVER = 'http://185.61.126.84:8000/api';

    this.API_IMAGES = 'http://185.61.126.84:8000/';
  }
}
