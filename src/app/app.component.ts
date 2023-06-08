import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedserviceService } from './shared/services/sharedservice.service';
import { delay, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'MeetMas';
  isLoading: boolean = false;

  constructor(private sharedserviceService: SharedserviceService) { }

  ngAfterViewInit(): void {
    this.sharedserviceService.isLoading
      .pipe(startWith(false), delay(0))
      .subscribe((res) => {
        this.isLoading = res;
      });
  }
}
