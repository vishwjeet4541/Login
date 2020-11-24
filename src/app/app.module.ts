import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemService } from './service/item.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { IonicStorageModule } from '@ionic/storage';
import { AuthHeaderInterceptor } from './http-interceptors/auth-header-interceptors';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from 'ionic-native';
import { File } from '@ionic-native/file/ngx';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
     AngularFireAuthModule, HttpClientModule,   IonicStorageModule.forRoot()
  ],
  
  providers: [ItemService,
    StatusBar,
    SplashScreen, FormBuilder,   File,
    Camera, AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide : LocationStrategy , useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
