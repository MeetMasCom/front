import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  @ViewChild('successPModal') successPModal!: ModalAlertsComponent;
  @ViewChild('failPModal') failPModal!: ModalAlertsComponent;
  @ViewChild('successPassUD') successPassUD!: ModalAlertsComponent;
  @ViewChild('failPassUD') failPassUD!: ModalAlertsComponent;
  @ViewChild('recoverSuccessUD') recoverSuccessUD!: ModalAlertsComponent;
  @ViewChild('recoverFailUD') recoverFailUD!: ModalAlertsComponent;
  @ViewChild('recoverWarningUD') recoverWarningUD!: ModalAlertsComponent;

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
  deportes: any = [];
  token = '';
  id = '';
  img: any;
  file!: File;
  dataUser: any = [];
  errMsj = '';
  estado: any;
  showPass1 = false;
  showPass2 = false;
  msj = '';

  constructor(
    public userService: UserServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.dataUser = JSON.parse(sessionStorage.getItem('data')!);
    this.activatedRoute.params.subscribe((params) => {
      this.estado = params['estado'];
    });

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
    await this.getSport();

    if (sessionStorage.getItem('token')!) {
      this.token = JSON.parse(sessionStorage.getItem('token')!);
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  async onUpdate(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUser(form, this.id, this.token)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        this.successPModal.abrir();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      this.failPModal.abrir();
    }
  }

  async onUpdateBasic(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUserBasic(form, this.id, this.token, this.img)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        this.successPModal.abrir();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      this.failPModal.abrir();
    }
  }

  async onUpdateAddress(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUserAddress(form, this.id, this.token)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        this.successPModal.abrir();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      this.failPModal.abrir();
    }
  }

  onRedirigir() {
    this.router.navigate(['/fad']);
  }

  onChange(event: any): void {
    this.file = <File>event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      const base64String = reader.result!.toString().split(',')[1];
      const pureBase64 = base64String.replace(/[^a-zA-Z0-9+/]/g, '');

      this.img = pureBase64;
    };
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

  async getSport() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PRACTICA_DEPORTE')
      );

      response.data.map((x: any) => {
        this.deportes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  onShowPass1() {
    this.showPass1 = true;
  }

  onShowPass2() {
    this.showPass1 = false;
    this.showPass2 = true;
  }

  onReload() {
    location.reload();
  }

  async onRecoverUD() {
    try {
      const response = await lastValueFrom(
        this.userService.recoverPass(sessionStorage.getItem('user')!)
      );

      if (response.data !== null) {
        this.msj = response.data;
        this.successPassUD.abrir();
      }
    } catch (error: any) {
      this.msj = error.error.message;
      this.failPassUD.abrir();
    }
  }

  async onResetUD(form: any) {
    if (form.value.passNewUD.toString() === form.value.passRUD.toString()) {
      try {
        const response = await lastValueFrom(
          this.userService.resetPass(
            sessionStorage.getItem('user')!,
            form.value.passNewUD,
            form.value.codeUD
          )
        );

        if (response.data !== null) {
          this.msj = response.data;
          this.recoverSuccessUD.abrir();
        }
      } catch (error: any) {
        this.msj = error.error.message;
        this.recoverFailUD.abrir();
      }
    } else {
      this.recoverWarningUD.abrir();
    }
  }
}
