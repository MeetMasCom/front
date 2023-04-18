import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  @Input() userN!: string;
  @ViewChild('otp') otp: any;
  classA: string = '';
  message: string = '';

  constructor(public userService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {}

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
      sessionStorage.setItem('data', JSON.stringify(response.data.user));
      sessionStorage.setItem('user', response.data.user.userName);
      sessionStorage.setItem('id', response.data.user._id);
      sessionStorage.setItem('token', JSON.stringify(response.data.token));
      this.classA = 'alert-success';
      this.message = response.message;        

      setTimeout(() => {
        this.router.navigate(['/fad']);
        let backDrop=document.querySelector('.modal-backdrop') as HTMLDivElement;
        if(backDrop!==null){
            backDrop.remove();
        }
      }, 1500);

      
      //location.reload();
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.message = error.error.message;
      location.reload();
    }
  }
}
