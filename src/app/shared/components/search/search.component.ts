import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SharedserviceService } from '../../services/sharedservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  show = false;
  userFree = false;
  userPay = false;
  user: any;
  countries: any;
  stateCivil: any = [];
  bodysF: any = [];
  zodiacal: any = [];
  drinks: any = [];
  smokes: any = [];
  childrens: any = [];

  constructor(private sharedService: SharedserviceService) {}

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    if (this.user.type !== 0) {
      this.userPay = true;
    } else {
      this.userFree = true;
    }
    await this.onGetCountry();
    await this.getStateCivil();
    await this.getBodyForm();
    await this.getZodiacal();
    await this.getDrinks();
    await this.getSmokes();
    await this.getChildrens();
  }

  search() {
    console.log('buscar');
  }

  moreOptions() {
    this.show = !this.show;
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.sharedService.getCountries());
      this.countries = response.data;
    } catch (error: any) {
      this.countries = [];
    }
  }

  async getStateCivil() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('ESTADO_CIVIL')
      );

      response.data.map((x: any) => {
        this.stateCivil.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.stateCivil = [];
    }
  }

  async getBodyForm() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('TIPO_CUERPO')
      );

      response.data.map((x: any) => {
        this.bodysF.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.bodysF = [];
    }
  }

  async getZodiacal() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('ZODIACAL')
      );

      response.data.map((x: any) => {
        this.zodiacal.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.zodiacal = [];
    }
  }

  async getDrinks() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('BEBIDA')
      );

      response.data.map((x: any) => {
        this.drinks.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.drinks = [];
    }
  }

  async getSmokes() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('FUMA')
      );

      response.data.map((x: any) => {
        this.smokes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.smokes = [];
    }
  }

  async getChildrens() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('HIJOS')
      );

      response.data.map((x: any) => {
        this.childrens.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.childrens = [];
    }
  }
}
