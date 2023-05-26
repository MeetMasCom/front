import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from './layouts/components/start-layout/start-layout.component';
import { StartFadComponent } from './fad/components/start-fad/start-fad.component';
import { CommentComponent } from './fad/components/comment/comment.component';
import { UserDataComponent } from './user/components/user-data/user-data.component';
import { HotelRegisterComponent } from './hotel/components/hotel-register/hotel-register.component';
import { VerifyHotelComponent } from './hotel/components/verify-hotel/verify-hotel.component';
import { ListHotelComponent } from './hotel/components/list-hotel/list-hotel.component';
import { HotelDetailComponent } from './hotel/components/hotel-detail/hotel-detail.component';
import { MyHotelComponent } from './hotel/components/my-hotel/my-hotel.component';
import { NoticesComponent } from './user/components/notices/notices.component';
import { AdminLayoutComponent } from './layouts/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminsComponent } from './admin/components/admins/admins.component';
import { BilleteraComponent } from './billetera/components/billetera/billetera.component';
import { BilleteraEmpresaComponent } from './billetera/components/billetera-empresa/billetera-empresa.component';
import { UpdateBilleteraEComponent } from './billetera/components/update-billetera-e/update-billetera-e.component';
import {MyProfileComponent} from './profile/components/my-profile/my-profile.component';
import {StartFriendsComponent} from './friends/components/start-friends/start-friends.component';
import { TravellersComponent } from './friends/components/travellers/travellers.component';
import { ProfesionalsComponent } from './friends/components/profesionals/profesionals.component';
import { BusinessmenComponent } from './friends/components/businessmen/businessmen.component';
import { StudentsComponent } from './friends/components/students/students.component';
import { LanguagesComponent } from './friends/components/languages/languages.component';
import { UserProfileComponent } from './profile/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: StartLayoutComponent },

  //modas
  { path: 'fad', component: StartFadComponent },
  { path: 'commentFad/:id', component: CommentComponent },
  
  { path: 'dataUser', component: UserDataComponent },
  { path: 'dataUser/:estado', component: UserDataComponent },

  //hoteles
  { path: 'registerHotel', component: HotelRegisterComponent },
  { path: 'hotelToVerify', component: VerifyHotelComponent },
  { path: 'hotel', component: ListHotelComponent },
  { path: 'hotelDetail/:id', component: HotelDetailComponent },
  { path: 'myHotel/:id', component: MyHotelComponent },
  { path: 'anuncios', component: NoticesComponent },

  //admin
  { path: 'admin', component: AdminLayoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administradores', component: AdminsComponent },

  //billetera
  { path: 'myBilletera', component: BilleteraComponent },
  { path: 'billetera', component: BilleteraEmpresaComponent },
  { path: 'updateBilletera/:id', component: UpdateBilleteraEComponent },

  //perfil
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'userProfile', component: UserProfileComponent },


  //amigos
  { path: 'friends', component: StartFriendsComponent },
  { path: 'travellers/:id', component: TravellersComponent },
  { path: 'profesionals', component: ProfesionalsComponent },
  { path: 'businessmen', component: BusinessmenComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'languages', component: LanguagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
