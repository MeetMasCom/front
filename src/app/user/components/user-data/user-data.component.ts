import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  stateCivil: any = [];
  policies: any = [];
  drinks: any = [];
  smokes: any = [];
  childrens: any = [];
  studiesU: any = [];
  bodysF: any = [];
  zodiacal: any = [];
  job: any = [];
  generos: any = [];
  token = '';
  id = '';

  constructor(public userService: UserServiceService, private router: Router) {}

  async ngOnInit() {
    await this.getStateCivil();
    await this.getPolicies();
    await this.getDrinks();
    await this.getSmokes();
    await this.getChildrens();
    await this.getStudies();
    await this.getBodyForm();
    await this.getZodiacal();
    await this.getJobs();
    await this.getGenero();
    if (sessionStorage.getItem('token')!) {
      this.token = sessionStorage.getItem('token')!;
      const aux = this.token.split('"');
      this.token = aux[1];
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  async onUpdate(form: any) {
    console.log('form', form.value);
    try {
      const response = await lastValueFrom(
        this.userService.updateUser(form, this.id, this.token)
      );
      if (response.data !== null) {
        this.router.navigate(['inicio']);
      }
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getStateCivil() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ESTADO_CIVIL')
      );

      response.data.map((x: any) => {
        this.stateCivil.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getPolicies() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('POLITICA')
      );

      response.data.map((x: any) => {
        this.policies.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getDrinks() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('BEBIDA')
      );

      response.data.map((x: any) => {
        this.drinks.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getSmokes() {
    try {
      const response = await lastValueFrom(this.userService.getCatalog('FUMA'));

      response.data.map((x: any) => {
        this.smokes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getChildrens() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('HIJOS')
      );

      response.data.map((x: any) => {
        this.childrens.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getStudies() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ESTUDIOS')
      );

      response.data.map((x: any) => {
        this.studiesU.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getBodyForm() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('TIPO_CUERPO')
      );

      response.data.map((x: any) => {
        this.bodysF.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getZodiacal() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ZODIACAL')
      );

      response.data.map((x: any) => {
        this.zodiacal.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );

      response.data.map((x: any) => {
        this.job.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getGenero() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('GENERO')
      );

      response.data.map((x: any) => {
        this.generos.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }
}