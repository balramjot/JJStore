import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../core/shared/service/auth.guard';
import { LayoutProductComponent } from './layout-product/layout-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: LayoutProductComponent,
    children: [{
      path: '',
      component: ProductComponent,
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
