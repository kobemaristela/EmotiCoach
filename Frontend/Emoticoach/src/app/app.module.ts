import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { MQTT_SERVICE_OPTIONS } from 'src/environments/environment';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalAddFriendsComponent } from './pages/gym-buddy/modal-add-friends/modal-add-friends.component';
import { FormsModule } from '@angular/forms';
import { GoogleApiComponent } from './pages/widgets/google-api/google-api.component';
import { ModalSendMsgComponent } from './pages/gym-buddy/modal-send-msg/modal-send-msg.component';
import { ModalMuscleComponent } from './pages/widgets/muscle-groups/modal-muscle/modal-muscle.component';

@NgModule({
  declarations: [
    AppComponent, 
    ModalAddFriendsComponent, 
    ModalSendMsgComponent,
    ModalMuscleComponent,
    GoogleApiComponent],

  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule, 
      NgChartsModule ,
      HttpClientModule,
      GoogleMapsModule,
      FormsModule,
      
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      }),
      MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
