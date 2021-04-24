import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustommaterialModule } from './../../core/shared/custommaterial/custommaterial.module';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { HeaderModule } from './../core/header/header.module';
import { FooterModule } from './../core/footer/footer.module';
import { SidebarModule } from './../core/sidebar/sidebar.module';

@NgModule({
  declarations: [
    DashboardComponent, 
    LayoutDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    CustommaterialModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
