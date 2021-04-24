import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../core/shared/service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';


const routes: Routes = [
  { path: '', component: LayoutDashboardComponent,
    children: [{
      path: '',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
