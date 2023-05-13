import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('modalOtp') modalOtp!: OtpComponent;
  @ViewChild('modalUserName') modalUserName!: ModalAlertsComponent;
  @ViewChild('modalPassword') modalPassword!: ModalAlertsComponent;
  @ViewChild('modalRecover') modalRecover!: ModalAlertsComponent;
  @ViewChild('modalUserSuccess') modalUserSuccess!: ModalAlertsComponent;
  @ViewChild('modalUserFail') modalUserFail!: ModalAlertsComponent;
  @ViewChild('modalCredencialSuccess')
  modalCredencialSuccess!: ModalAlertsComponent;
  @ViewChild('modalCredencialFail') modalCredencialFail!: ModalAlertsComponent;
  @ViewChild('modalPassSuccess') modalPassSuccess!: ModalAlertsComponent;
  @ViewChild('modalPassFail') modalPassFail!: ModalAlertsComponent;
  @ViewChild('modalRecoverSuccess') modalRecoverSuccess!: ModalAlertsComponent;
  @ViewChild('modalRecoverFail') modalRecoverFail!: ModalAlertsComponent;
  @ViewChild('modalRecoverWarning') modalRecoverWarning!: ModalAlertsComponent;

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
      if (response.data !== null) {
        this.message = response.data;
        this.modalCredencialSuccess.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalCredencialFail.abrir();
    }
  }

  onUser() {
    console.log('user');
    this.modalUserName.abrir();
  }

  onPass() {
    console.log('password');
    this.modalPassword.abrir();
  }

  async onForm(event: any) {
    try {
      const response = await lastValueFrom(
        this.userService.recoverUser(event.value.emailU)
      );

      if (response.data !== null) {
        this.message = response.data;
        this.modalUserSuccess.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalUserFail.abrir();
    }
  }

  async onFormPass(event: any) {
    try {
      sessionStorage.setItem('user', event.value.userU);
      const response = await lastValueFrom(
        this.userService.recoverPass(event.value.userU)
      );

      if (response.data !== null) {
        this.message = response.data;
        this.modalPassSuccess.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalPassFail.abrir();
    }
  }

  async onFormActPass(event: any) {
    if (event.value.passNew.toString() === event.value.passR.toString()) {
      try {
        const user = sessionStorage.getItem('user')!;
        const response = await lastValueFrom(
          this.userService.resetPass(
            user,
            event.value.passNew,
            event.value.code
          )
        );

        if (response.data !== null) {
          this.message = response.data;
          this.modalRecoverSuccess.abrir();
        }
      } catch (error: any) {
        this.message = error.error.message;
        this.modalRecoverFail.abrir();
      }
    } else {
      this.modalRecoverWarning.abrir();
    }
  }

  onValidCredecial() {
    this.modalOtp.abrir();
  }

  onFailValidCredecial() {
    location.reload();
  }

  onRecover() {
    this.modalRecover.abrir();
  }
}
