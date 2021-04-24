import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../core/shared/service/auth.guard';
import { CategoryComponent } from './category/category.component';
import { LayoutCategoryComponent } from './layout-category/layout-category.component';


const routes: Routes = [
  { path: '', component: LayoutCategoryComponent,
    children: [{
      path: '',
      component: CategoryComponent,
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
