import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../enviroments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOtpInputModule } from 'ng-otp-input';

//services
import { AuthServiceService } from './auth/services/auth-service.service';

//interceptors
import { AuthInterceptorInterceptor } from './auth/services/interceptors/auth-interceptor.interceptor';

//modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { StartLayoutComponent } from './layouts/components/start-layout/start-layout.component';
import { AdminLayoutComponent } from './layouts/components/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OtpComponent } from './auth/components/otp/otp.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { SummaryComponent } from './shared/components/summary/summary.component';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    StartLayoutComponent,
    AdminLayoutComponent,
    LoginComponent,
    OtpComponent,
    RegisterComponent,
    SummaryComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FontAwesomeModule,
    NgOtpInputModule,
  ],
  providers: [
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
