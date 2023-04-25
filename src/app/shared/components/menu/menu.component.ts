import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedserviceService } from '../../services/sharedservice.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  token: string = '';
  user: string = '';
  id: string = '';
  classA: string = '';
  msj: string = '';
  transLang: string[] = [];
  selectLang: string = 'es';

  constructor(
    library: FaIconLibrary,
    public sharedService: SharedserviceService,
    private router: Router,
    private translate: TranslateService
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.getTransLanguage();
    if (sessionStorage.getItem('token')!) {
      this.token = JSON.parse(sessionStorage.getItem('token')!);
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  async onLogout() {
    try {
      const body = {
        userName: this.user,
        password: '12345678',
        id: this.id,
        token: this.token,
      };
      const response = await lastValueFrom(this.sharedService.logout(body));
      if (response.data !== null) {
        sessionStorage.removeItem('data');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        //location.reload();
        this.router.navigate(['/inicio']);
      }
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.msj = error.error.message;
    }
  }

  setTransLanguage() {
    this.translate.use(this.selectLang);
  }

  getTransLanguage() {
    this.transLang = [...this.translate.getLangs()];
  }
}
