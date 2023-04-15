import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from './layouts/components/start-layout/start-layout.component';
import { UserDataComponent } from './user/components/user-data/user-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: StartLayoutComponent },
  { path: 'dataUser', component: UserDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
