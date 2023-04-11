import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  @Input() showModal!: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log('otp', this.showModal);
  }

  validateOtp(form: any) {
    console.log('otp', form.value);
  }
}
