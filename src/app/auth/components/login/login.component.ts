import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  classA: string;
  message: string;
  nameUser: string = '';

  constructor(public userService: AuthServiceService) {
    this.classA = '';
    this.message = '';
  }

  ngOnInit(): void {}

  async onLogin(form: any) {
    try {
      this.nameUser = form.value.userNameL;
      const response = await lastValueFrom(this.userService.login(form.value));
      this.classA = 'alert-success';
      this.message = response.data;
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.message = error.error.message;
    }
  }
}
