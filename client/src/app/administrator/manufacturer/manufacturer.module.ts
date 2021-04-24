import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustommaterialModule } from './../../core/shared/custommaterial/custommaterial.module';
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { LayoutManufacturerComponent } from './layout-manufacturer/layout-manufacturer.component';
import { HeaderModule } from './../core/header/header.module';
import { FooterModule } from './../core/footer/footer.module';
import { SidebarModule } from './../core/sidebar/sidebar.module';
import { ManufacturerService } from './manufacturer.service';

@NgModule({
  declarations: [
    ManufacturerComponent, 
    LayoutManufacturerComponent
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    CustommaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ManufacturerComponent
  ],
  providers: [
    ManufacturerService
  ]
})
export class ManufacturerModule { }
