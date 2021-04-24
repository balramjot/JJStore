import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./administrator/login/login.module').then(m=>m.LoginModule)
  },
  { path: 'dashboard',
    loadChildren: () => import('./administrator/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  { path: 'category',
    loadChildren: () => import('./administrator/category/category.module').then(m=>m.CategoryModule)
  },
  { path: 'manufacturer',
    loadChildren: () => import('./administrator/manufacturer/manufacturer.module').then(m=>m.ManufacturerModule)
  },
  { path: 'product',
    loadChildren: () => import('./administrator/product/product.module').then(m=>m.ProductModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },         
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
