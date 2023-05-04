import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
})
export class NoticesComponent implements OnInit {
  @ViewChild('successNotices') successNotices!: ModalAlertsComponent;
  @ViewChild('failNotices') failNotices!: ModalAlertsComponent;

  errMsj: string = '';
  jobs: any = [];
  countries: any = [];

  constructor(private userService: UserServiceService) {}

  async ngOnInit() {
    await this.getJobs();
    await this.onGetCountry();
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );

      response.data.map((x: any) => {
        this.jobs.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      this.countries = response.data;
    } catch (error: any) {
      console.log(error.error);
    }
  }

  async onRegister(form: any) {
    console.log('form', form.value);
    this.successNotices.abrir();
    //this.failNotices.abrir()
  }
}
