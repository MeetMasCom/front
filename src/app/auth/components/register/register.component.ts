import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('recaptcha', { static: true })
  recaptchaElement!: ElementRef;
  response: boolean = false;
  token: string | undefined;
  nombres: string = '';
  apellidos: string = '';
  sponsorCode: string = '';
  errormsg: string = '';
  errordate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: AuthServiceService
  ) {
    this.token = undefined;
  }

  ngOnInit() {
    this.addRecaptchaScript();
  }

  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      sitekey: '6Ldh-OUkAAAAABttC1R3VMEP-s8U3PjX2qJiLX13',
      callback: () => {
        this.response = true;
      },
    });
  }

  addRecaptchaScript() {
    (function (d, s, id, obj) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        obj.renderReCaptch();
        return;
      }
      js = d.createElement(s);
      js.id = id;
      fjs.parentNode!.insertBefore(js, fjs);
    })(document, 'script', 'recaptcha-jssdk', this);
  }

  async onRegister(form: any) {
    const response = grecaptcha.getResponse();
    if (response !== '') {
      try {
        const resp = await lastValueFrom(this.userService.register(form.value));

        console.log('resp', resp);
      } catch (error) {
        console.log(error);
      }
    }
  }

  onValidateDateBirth(fecha: string) {
    const dateAct = new Date().getFullYear();
    const dateTemp = fecha.split('-');
    const years = dateAct - parseInt(dateTemp[0]);

    if (years < 13) {
      this.errordate = 'Debe tener 13 años.';
    }
    if (years >= 13) {
      this.errordate = '';
    }
  }
}
