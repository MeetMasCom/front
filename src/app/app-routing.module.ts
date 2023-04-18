import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from './layouts/components/start-layout/start-layout.component';
import { StartFadComponent } from './fad/components/start-fad/start-fad.component';
import { RegisterFadComponent } from './fad/components/register-fad/register-fad.component';
import { CommentComponent } from './fad/components/comment/comment.component';
import { UserDataComponent } from './user/components/user-data/user-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: StartLayoutComponent },
  { path: 'fad', component: StartFadComponent },
  { path: 'registerFad', component: RegisterFadComponent },
  { path: 'commentFad/:id', component: CommentComponent },
  { path: 'dataUser', component: UserDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
