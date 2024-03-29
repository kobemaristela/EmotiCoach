import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalAddFriendsComponent } from './pages/gym-buddy/modal-add-friends/modal-add-friends.component';
import { FormsModule } from '@angular/forms';
import { GoogleApiComponent } from './pages/widgets/google-api/google-api.component';
import { ModalMuscleComponent } from './pages/widgets/muscle-groups/modal-muscle/modal-muscle.component';
import { ComponentsModule } from './components.module';
import { Keychain } from '@awesome-cordova-plugins/keychain/ngx';
import { MQTT_SERVICE_OPTIONS } from 'src/environments/tokens';

@NgModule({
  declarations: [
    AppComponent, 
    ModalAddFriendsComponent,
    ModalMuscleComponent,
    GoogleApiComponent,
  ],

  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule, 
      NgChartsModule ,
      HttpClientModule,
      GoogleMapsModule,
      FormsModule,
      
      ComponentsModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      }),
      MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Keychain],
  bootstrap: [AppComponent],
})
export class AppModule {}
