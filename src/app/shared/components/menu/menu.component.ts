import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faMessage, faBell } from '@fortawesome/free-solid-svg-icons';

import { SharedserviceService } from '../../services/sharedservice.service';
import { ProfileServiceService } from '../../../profile/services/profile-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/enviroments/environment';
import { LanguageI } from '../../interfaces/language.interface';
import { MmodalComponent } from '../mmodal/mmodal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @ViewChild('mnotification') mnotification!: MmodalComponent;
  token: string = '';
  user: string = '';
  id: string = '';
  classA: string = '';
  msj: string = '';
  langs: LanguageI[] = environment.languages;
  selectLang!: LanguageI;
  friendsService: any;
  profile: any;
  val: string = '';
  AllPost: any;
  nuevas: number = 0;

  faBell = faBell;
  notification: any = [];

  constructor(
    library: FaIconLibrary,
    public sharedService: SharedserviceService,
    public profileService: ProfileServiceService,
    private router: Router,
    private translate: TranslateService
  ) {
    library.addIconPacks(fas);
    this.selectLang = this.langs[0];
    translate.setDefaultLang(this.selectLang.alias);
    translate.addLangs(
      this.langs.map((f) => {
        return f.alias;
      })
    );
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')!) {
      this.token = JSON.parse(sessionStorage.getItem('token')!);
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    this.translate.use(this.langs[0].alias);
    this.getProfile();
    this.getNotificacion();
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
        sessionStorage.removeItem('item');
        this.router.navigate(['/inicio']);
      }
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.msj = error.error.message;
    }
  }

  async getProfile() {
    const resp = await lastValueFrom(this.profileService.getProfile());
    if (resp.data.length > 0) {
      this.profile = resp.data;
    } else {
      console.log('no se encontraron datos');
    }
  }

  setTransLanguage(lang: LanguageI) {
    this.selectLang = lang;
    this.translate.use(lang.alias);
  }

  async getNotificacion() {
    const resp = await lastValueFrom(
      this.profileService.getNotification(this.id)
    );
    if (resp.data.length > 0) {
      this.notification = resp.data;

      this.notification.forEach((element: any, index: any) => {
        if (element.state === 0) {
          this.nuevas++;
        }
      });
    } else {
      console.log('no se encontraron datos');
    }
  }

  notificaciones() {
    this.mnotification.abrir();
  }

  async updateLike(event: any) {
    await lastValueFrom(this.profileService.updateNotification(event));

    location.reload();
  }

  onRegister() {
    this.router.navigate(['/registro', '']);
  }
}
