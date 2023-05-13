import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  @Input() userN!: string;
  @Input() idModal: string = '';
  @ViewChild('otp') otp: any;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;
  @ViewChild('failModal') failModal!: ModalAlertsComponent;
  @ViewChild('modalOtpButton') modalOtpButton!: ElementRef;

  classA: string = '';
  message: string = '';

  constructor(public userService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {}

  abrir() {
    this.modalOtpButton.nativeElement.click();
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.otp.setValue(val);
  }

  async validateOtp() {
    try {
      const response = await lastValueFrom(
        this.userService.validateOtp(parseInt(this.otp), this.userN)
      );

      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data.user));
        sessionStorage.setItem('user', response.data.user.userName);
        sessionStorage.setItem('id', response.data.user._id);
        sessionStorage.setItem('token', JSON.stringify(response.data.token));

        this.message = response.message;
        this.exitoModal.abrir();
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.message = error.error.message;
      this.failModal.abrir();
    }
  }

  onRedirigir() {
    this.router.navigate(['/fad']);
  }

  onFail() {
    location.reload();
  }
}
