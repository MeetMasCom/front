import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsSystem {
  API_LOCAL: string = '';
  API_SERVER: string = '';
  API_IMAGES: string = '';
  API_IMAGES_LOCAL: string = '';

  constructor() {
    this.API_LOCAL = 'http://localhost:8000/api';

    this.API_IMAGES_LOCAL = 'http://localhost:8000';

    //this.API_SERVER = 'https://meetmas.com/api';
    this.API_SERVER = 'http://localhost:8000/api';

    //this.API_IMAGES = 'http://meetmas.com/';
    this.API_IMAGES = 'http://localhost:8000';
  }
}
