import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  opSelect: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.opSelect = 'AD';
  }

  async onLoginAdmin(form: any) {
    console.log('form', form.value);
    this.router.navigate(['dashboard']);
  }

  onChangeSelect(event: any) {
    this.opSelect = event.target.value;
  }
}
