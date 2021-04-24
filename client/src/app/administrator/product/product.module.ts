import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustommaterialModule } from './../../core/shared/custommaterial/custommaterial.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { LayoutProductComponent } from './layout-product/layout-product.component';
import { HeaderModule } from './../core/header/header.module';
import { FooterModule } from './../core/footer/footer.module';
import { SidebarModule } from './../core/sidebar/sidebar.module';
import { ProductService } from './product.service';
import { NewproductComponent } from './newproduct/newproduct.component';
import { CancelproductComponent } from './cancelproduct/cancelproduct.component';
import { DragndropDirective } from './dragndrop.directive';
import { ProgressbarComponent } from './progressbar/progressbar.component';



@NgModule({
  declarations: [
    ProductComponent, 
    LayoutProductComponent, 
    NewproductComponent, 
    CancelproductComponent, 
    DragndropDirective, 
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    CustommaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
