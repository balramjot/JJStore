import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../core/shared/service/auth.guard';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { LayoutManufacturerComponent } from './layout-manufacturer/layout-manufacturer.component';


const routes: Routes = [
  { path: '', component: LayoutManufacturerComponent,
    children: [{
      path: '',
      component: ManufacturerComponent,
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
