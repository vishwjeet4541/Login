import { Component, ViewChild, ElementRef, OnInit, ɵConsole } from '@angular/core';


import { Plugins } from '@capacitor/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


import { AuthService } from '../services/auth.service';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../services/http.service';
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
  constructor(public loadingController: LoadingController,private storage: Storage, public nav: NavController,public auth: AuthService, public plt: Platform, public formBuilder: FormBuilder, public http: HttpService, )  {
    let val1 = sessionStorage.getItem('loggedInUser')
    this.data  = AES.decrypt(val1,'Test').toString(utf8);
 this.data1 = JSON.parse(this.data)
 this.UserName =  this.data1.firstname;
 this.lastname = this.data1.lastname
 this.userEmail = this.data1.useremail
 console.log("login",this.data1)
        
   }  
   ionViewDidLoad(){

   }
   ionViewWillEnter(){
 
   }
  ngOnInit() {
    this.val1 = sessionStorage.getItem('isLoggedin')
    if(this.val1 != 'true'){ this.nav.navigateBack('login')}
   
  }

  
  
  
}
