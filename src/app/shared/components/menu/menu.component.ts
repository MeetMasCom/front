import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedserviceService } from '../../services/sharedservice.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/enviroments/environment';
import { LanguageI } from '../../interfaces/language.interface';

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
  langs: LanguageI[] = environment.languages;
  selectLang!: LanguageI;

  constructor(
    library: FaIconLibrary,
    public sharedService: SharedserviceService,
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

  setTransLanguage(lang: LanguageI) {
    this.selectLang = lang;
    this.translate.use(lang.alias);
  }
}
