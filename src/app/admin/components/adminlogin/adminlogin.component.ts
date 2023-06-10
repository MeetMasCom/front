import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { OtpComponent } from 'src/app/auth/components/otp/otp.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {

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

  opSelect: any;
  classA: string | undefined;
  message: string='';
  nameUser: string = '';

  constructor(private router: Router, private adminService:AdminServiceService) {}

  ngOnInit() {
    this.opSelect = 'AD';
  }

  async onLoginAdmin(form: any) {
    try {
      this.nameUser = form.value.userAdmin;
      const response = await lastValueFrom(this.adminService.login(form.value));
      if (response.data !== null) {
        this.message = response.data;
        console.log(this.message);
        this.modalCredencialSuccess.abrir();
        //this.router.navigate(['dashboard']);
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalCredencialFail.abrir();
    }
    
  }

  onChangeSelect(event: any) {
    this.opSelect = event.target.value;
  }

  onUser() {
    this.modalUserName.abrir();
  }

  onPass() {
    this.modalPassword.abrir();
  }

  onValidOtp() {
    this.modalOtp.abrir();
  }

  onFailValidCredecial() {
    location.reload();
  }

  onRecover() {
    this.modalRecover.abrir();
  }

}
