import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutLoginComponent } from './layout-login/layout-login.component';
import { notAuthGuard } from './../../core/shared/service/notauth.guard';


const routes: Routes = [
  { path: '', component: LayoutLoginComponent,
    children: [{
      path: '',
      component: LoginComponent,
      canActivate: [notAuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
