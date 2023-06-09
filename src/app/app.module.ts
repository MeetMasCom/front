import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../enviroments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ConstantsSystem } from './utils/constants-system';
import { ClipboardModule } from 'ngx-clipboard';

//services
import { AuthServiceService } from './auth/services/auth-service.service';
import { SharedserviceService } from './shared/services/sharedservice.service';

//interceptors
import { AuthInterceptorInterceptor } from './auth/services/interceptors/auth-interceptor.interceptor';
import { SharedInterceptorInterceptor } from './shared/services/interceptors/shared-interceptor.interceptor';

//modules
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { CommentComponent } from './fad/components/comment/comment.component';
import { RegisterFadComponent } from './fad/components/register-fad/register-fad.component';
import { StartFadComponent } from './fad/components/start-fad/start-fad.component';
import { StarsComponent } from './fad/components/stars/stars.component';
import { MmodalComponent } from './shared/components/mmodal/mmodal.component';
import { RatingStarComponent } from './shared/components/rating-star/rating-star.component';
import { MultiSelectComponent } from './shared/components/multi-select/multi-select.component';
import { UserDataComponent } from './user/components/user-data/user-data.component';
import { HotelRegisterComponent } from './hotel/components/hotel-register/hotel-register.component';
import { ListHotelComponent } from './hotel/components/list-hotel/list-hotel.component';
import { VerifyHotelComponent } from './hotel/components/verify-hotel/verify-hotel.component';
import { ModalAlertsComponent } from './shared/components/modal-alerts/modal-alerts.component';
import { ColumnsComponent } from './shared/components/columns/columns.component';
import { HotelDetailComponent } from './hotel/components/hotel-detail/hotel-detail.component';
import { MyHotelComponent } from './hotel/components/my-hotel/my-hotel.component';
import { NoticesComponent } from './user/components/notices/notices.component';
import { AdminloginComponent } from './admin/components/adminlogin/adminlogin.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { MenuadminComponent } from './shared/components/menuadmin/menuadmin.component';
import { AdminsComponent } from './admin/components/admins/admins.component';
import { SupSystemsComponent } from './admin/components/sup-systems/sup-systems.component';
import { SupSalesComponent } from './admin/components/sup-sales/sup-sales.component';
import { SupNoticesComponent } from './admin/components/sup-notices/sup-notices.component';
import { BilleteraComponent } from './billetera/components/billetera/billetera.component';
import { BilleteraEmpresaComponent } from './billetera/components/billetera-empresa/billetera-empresa.component';
import { UpdateBilleteraEComponent } from './billetera/components/update-billetera-e/update-billetera-e.component';
import { MyProfileComponent } from './profile/components/my-profile/my-profile.component';
import { StartFriendsComponent } from './friends/components/start-friends/start-friends.component';
import { TravellersComponent } from './friends/components/travellers/travellers.component';
import { ProfesionalsComponent } from './friends/components/profesionals/profesionals.component';
import { BusinessmenComponent } from './friends/components/businessmen/businessmen.component';
import { StudentsComponent } from './friends/components/students/students.component';
import { LanguagesComponent } from './friends/components/languages/languages.component';
import { UserProfileComponent } from './profile/components/user-profile/user-profile.component';
import { AdsLayoutComponent } from './layouts/components/ads-layout/ads-layout.component';
import { NoticesTypeComponent } from './user/components/notices-type/notices-type.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { HomeComponent } from './profile/components/home/home.component';
import { SearchComponent } from './shared/components/search/search.component';
import { AdminMembershipComponent } from './admin/components/admin-membership/admin-membership.component';
import { UserMembershipComponent } from './user/components/user-membership/user-membership.component';
import { SponsorComponent } from './user/components/sponsor/sponsor.component';
import { RefersComponent } from './user/components/refers/refers.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    CommentComponent,
    RegisterFadComponent,
    StartFadComponent,
    StarsComponent,
    MmodalComponent,
    RatingStarComponent,
    MultiSelectComponent,
    UserDataComponent,
    ModalAlertsComponent,
    HotelRegisterComponent,
    VerifyHotelComponent,
    ListHotelComponent,
    ColumnsComponent,
    HotelDetailComponent,
    MyHotelComponent,
    NoticesComponent,
    AdminloginComponent,
    DashboardComponent,
    MenuadminComponent,
    AdminsComponent,
    BilleteraComponent,
    BilleteraEmpresaComponent,
    UpdateBilleteraEComponent,
    SupSalesComponent,
    UpdateBilleteraEComponent,
    AdminsComponent,
    SupSystemsComponent,
    SupNoticesComponent,
    MyProfileComponent,
    StartFriendsComponent,
    TravellersComponent,
    ProfesionalsComponent,
    BusinessmenComponent,
    StudentsComponent,
    LanguagesComponent,
    UserProfileComponent,
    AdsLayoutComponent,
    NoticesTypeComponent,
    ChatComponent,
    HomeComponent,
    SearchComponent,
    AdminMembershipComponent,
    UserMembershipComponent,
    SponsorComponent,
    RefersComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FontAwesomeModule,
    NgOtpInputModule,
    NgOptimizedImage,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    ClipboardModule,
  ],
  providers: [
    AuthServiceService,
    SharedserviceService,
    ConstantsSystem,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedInterceptorInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
