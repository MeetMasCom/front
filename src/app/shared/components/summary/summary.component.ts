import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../../services/sharedservice.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  total: number = 0;
  online: number = 0;
  men: number = 0;
  woman: number = 0;

  constructor(private sharedService: SharedserviceService) {}

  ngOnInit() {
    this.getSummary();
  }

  async getSummary() {
    const response = await lastValueFrom(this.sharedService.sumaryService());

    this.total = response.data.total;
    this.online = response.data.online;
    this.men = response.data.men;
    this.woman = response.data.woman;
  }
}
