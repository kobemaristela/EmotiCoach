import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [AppComponent],

  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule, 
      NgChartsModule ,
      HttpClientModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      }),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
