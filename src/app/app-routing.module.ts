import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from './layouts/components/start-layout/start-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: StartLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
