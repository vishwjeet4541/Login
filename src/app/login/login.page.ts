import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { HttpService } from '../services/http.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  user: any;
  postData = {
		username: '',
		password: ''
		};

  loginForm: FormGroup;
	loginError: string;
	errorMessage: string;
  private menu: MenuController;
	authenticationService: any;
	userData: any;
	userid: any;
  data: any;
  data1: any;
  CustomerNumber: any;
  UserName: any;
  userRoll: any;
  phone: any;
  constructor(private toastService: ToastService, 
private authService: AuthService,
private storageService: StorageService,public menuCtrl: MenuController, public loadingController:LoadingController, public nav:NavController,private http: HttpService ,private storage: Storage,)  {
     }

  ngOnInit() {
    this.menuCtrl.enable(false); 
  }
 

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
    this.postData.username &&
    this.postData.password &&
    username.length > 0 &&
    password.length > 0
    );
    }
    async loginAction() {
      if (this.validateInputs()) {
        console.log("Loginaction True")
        const loading = await this.loadingController.create({
          message: 'Please wait...',
        });
        await loading.present();
      this.authService.login(this.postData).subscribe(
      (res) => {
        console.log("Response")
        this.storage.set('isLoggedin', 'true')
        sessionStorage.setItem('loggedInUser', res)
        loading.dismiss();
        this.nav.navigateRoot('dashboard')
     let val = sessionStorage.getItem('loggedInUser')
      this.data  = AES.decrypt(val,'Test').toString(utf8);
      this.data1 = JSON.parse(this.data)
      if (res.postData !== null ) {
      loading.dismiss();
      console.log("loader")
        this.nav.navigateRoot('dashboard')
      } else {   loading.dismiss();
      this.toastService.presentToast('Incorrect username and password.');
      }
      },
      (error: any) => {  loading.dismiss();
      this.toastService.presentToast(' Enter Valide Username & Password');
      }
      );
      } else {  
      this.toastService.presentToast(
      'Please enter username or password.'
      );
      }
      }
     
      signup(){  this.nav.navigateForward('signup')  }
    



}
