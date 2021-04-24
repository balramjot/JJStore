import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustommaterialModule } from './core/shared/custommaterial/custommaterial.module';
import { MainServiceService } from './core/shared/service/main-service.service';
import { AuthGuard } from './core/shared/service/auth.guard';
import { notAuthGuard } from './core/shared/service/notauth.guard';
import { TokenInterceptorService } from './core/shared/service/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustommaterialModule,
    HttpClientModule
  ],
  providers: [
    MainServiceService,
    AuthGuard,
    notAuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
