import { Component, ViewChild, ElementRef, OnInit, ɵConsole } from '@angular/core';


import { Plugins } from '@capacitor/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


import { AuthService } from '../services/auth.service';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Storage } from '@ionic/storage';
import { AlertController, IonRouterOutlet, LoadingController, NavController, Platform } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AuthConstants } from '../confi/auth-constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  data: any;
  data1: any;
  UserName: any;
  lastname: any;
  userEmail: any;
  val1: string;
  constructor(public loadingController: LoadingController,private routerOutlet: IonRouterOutlet,private alertController: AlertController, private storageService: StorageService, private router: Router,private storage: Storage, public nav: NavController,public auth: AuthService, public plt: Platform, public formBuilder: FormBuilder, public http: HttpService, )  {
    let val1 = sessionStorage.getItem('loggedInUser')
    this.data  = AES.decrypt(val1,'Test').toString(utf8);
 this.data1 = JSON.parse(this.data)
 this.UserName =  this.data1.firstname;
 this.lastname = this.data1.lastname
 this.userEmail = this.data1.useremail
 
        
   }  
   ionViewDidLoad(){

   }
   ionViewWillEnter(){
  
   }
  ngOnInit() {
    
  }

  async  LogOut(){
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Yes',
        handler: () => {
          this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
               sessionStorage.clear();
            this.router.navigate(['/login']);
          });
        }
      }]
    });
    await alert.present();
      }
  
  
}
