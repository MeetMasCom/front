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
import { AdsLayoutComponent } from './layouts/components/ads-layout/ads-layout.component';

import { AdminLayoutComponent } from './layouts/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminsComponent } from './admin/components/admins/admins.component';
import { BilleteraComponent } from './billetera/components/billetera/billetera.component';
import { BilleteraEmpresaComponent } from './billetera/components/billetera-empresa/billetera-empresa.component';
import { UpdateBilleteraEComponent } from './billetera/components/update-billetera-e/update-billetera-e.component';
import { SupSystemsComponent } from './admin/components/sup-systems/sup-systems.component';
import { SupSalesComponent } from './admin/components/sup-sales/sup-sales.component';
import { SupNoticesComponent } from './admin/components/sup-notices/sup-notices.component';

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
  { path: 'anuncios', component: AdsLayoutComponent },

  //admin
  { path: 'admin', component: AdminLayoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administradores', component: AdminsComponent },

  //billetera

  { path: 'billetera', component: BilleteraComponent },
  { path: 'billeteraE', component: BilleteraEmpresaComponent },
  { path: 'updateBilleteraE/:id', component: UpdateBilleteraEComponent },
  { path: 'supSistemas', component: SupSystemsComponent },
  { path: 'supVentas', component: SupSalesComponent },
  { path: 'supAnuncios', component: SupNoticesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
