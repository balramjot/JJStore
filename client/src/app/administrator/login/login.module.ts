import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LayoutLoginComponent } from './layout-login/layout-login.component';
import { HeaderModule } from './../core/header/header.module';
import { LoginRoutingModule } from './login-routing.module';
import { CustommaterialModule } from './../../core/shared/custommaterial/custommaterial.module';
import { LoginServiceService } from './login-service.service';

@NgModule({
  declarations: [
    LoginComponent, 
    LayoutLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    HeaderModule,
    CustommaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginServiceService
  ]
})
export class LoginModule { }
