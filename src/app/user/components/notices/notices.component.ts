import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
})
export class NoticesComponent implements OnInit {
  @ViewChild('successNotices') successNotices!: ModalAlertsComponent;
  @ViewChild('failNotices') failNotices!: ModalAlertsComponent;

  ageList: any = [];
  profsList: any = [];
  countriesList: any = [];
  generoList: any = [];

  selectedProfs = [];
  selectedCountry = [];
  selectedAge = [];
  selectedGenero = [];

  dropdownSettings: IDropdownSettings = {};
  errMsj: string = '';
  jobs: any = [];
  countries: any = [];
  generos: any = [];

  constructor(private userService: UserServiceService) {}

  async ngOnInit() {
    await this.getJobs();
    await this.onGetCountry();
    await this.getGenero();

    this.selectedProfs = [];
    this.selectedCountry = [];
    this.selectedAge = [];
    this.selectedGenero = [];

    this.profsList = this.jobs;
    this.countriesList = this.countries;
    this.generoList = this.generos;
    this.ageList = [
      { item_id: '1', item_text: 'De 13 a 15 años' },
      { item_id: '2', item_text: 'De 16 a 18 años' },
      { item_id: '3', item_text: 'De 19 a 25 años' },
      { item_id: '4', item_text: 'De 25 años en adelante' },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );

      response.data.map((x: any) => {
        this.jobs.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
      this.jobs = [];
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      response.data.forEach((element: any) => {
        this.countries.push({
          item_id: element._id,
          item_text: element.name,
        });
      });
    } catch (error: any) {
      console.log(error.error);
      this.countries = [];
    }
  }

  async getGenero() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('GENERO')
      );

      response.data.forEach((x: any) => {
        this.generos.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async onRegister(form: any) {
    console.log('form', form.value);
    this.successNotices.abrir();
    //this.failNotices.abrir()
  }

  onSelectProf(item: any) {
    console.log(item);
  }

  onSelectAllProf(items: any) {
    console.log(items);
  }

  onDeSelectProf(item: any) {
    console.log(item);
  }

  onSelectCountry(item: any) {
    console.log(item);
  }

  onSelectAllCountry(items: any) {
    console.log(items);
  }

  onDeSelectCountry(item: any) {
    console.log(item);
  }
}
