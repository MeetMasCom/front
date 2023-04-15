import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedserviceService } from '../../services/sharedservice.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    library: FaIconLibrary,
    public sharedService: SharedserviceService,
    private router: Router
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')!) {
      this.token = sessionStorage.getItem('token')!;
      const aux = this.token.split('"');
      this.token = aux[1];
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
        this.router.navigate(['inicio']);
      }
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.msj = error.error.message;
    }
  }
}
