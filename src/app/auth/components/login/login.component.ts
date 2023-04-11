import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  status: boolean;
  classA: string;
  message: string;

  constructor() {
    this.status = false;
    this.classA = '';
    this.message = '';
  }

  ngOnInit(): void {}

  onLogin(form: any): void {
    console.log('form', form.value);
    //llamar servicio login
    this.classA = 'alert-success';
    this.message = 'OTP enviado';
    this.status = true;
  }
}
