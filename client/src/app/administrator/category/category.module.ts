import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustommaterialModule } from './../../core/shared/custommaterial/custommaterial.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { LayoutCategoryComponent } from './layout-category/layout-category.component';
import { HeaderModule } from './../core/header/header.module';
import { FooterModule } from './../core/footer/footer.module';
import { SidebarModule } from './../core/sidebar/sidebar.module';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    CategoryComponent, 
    LayoutCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    CustommaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoryComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
