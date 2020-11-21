import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public loginForm: FormGroup;
  masg: Object;
  isSubmitted = false;
  date: Date;
  constructor( public http:HttpService, public auth:AuthService, public nav:NavController, public loadingController:LoadingController, public toastService:ToastService, public formBuilder: FormBuilder) {
       this.date = new Date()
    this.loginForm = formBuilder.group({
      FirstName: ['',[Validators.required, Validators.minLength(2)]],
      LastName: ['',[Validators.required, Validators.minLength(2)]],
      address: ['',[Validators.required, Validators.minLength(2)]],
      mobno1: ['',[Validators.required, Validators.minLength(10) , Validators.maxLength(10)]],
      // BusinessName: [''],
     userEmail:['']

  });
   }

  ngOnInit() {
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  async submitForm(){
    
    this.isSubmitted = true;
    let Formdata = this.loginForm.value
    // var TId = this.ionicForm.value['TransactionID']
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
    const loading = await this.loadingController.create({
          message: 'Please wait...',
        });
        await loading.present();
    console.log("in user")
    let FormData = this.loginForm.value
    let data = {
      srno: 1,
       FirstName:FormData.FirstName,
			LastName:FormData.LastName,
      username: FormData.mobno1,
      BusinessName: '9881717477',
			password: Math.floor(1000 + Math.random() * 9000).toString(),
			address: FormData.address,
      userEmail: FormData.userEmail,
      status: "",
			mobno1: FormData.mobno1,
      mobno2: FormData.mobno1,
      CreateDate: this.date,
      profilephoto:"",
			deviceId: "",
			userRollstatus: "0",
      DistributorId: "3",
      TempOTP: 1234
    }

    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json; charset=utf8'
      });

      this.auth.userCreation(data).subscribe(
        res => { 
          
              loading.dismiss();
             this.masg =res['statuscode'];
             if(this.masg == 19){  Swal.fire('User Already Exist!') }
             else{ this.nav.navigateForward('login')
            Swal.fire(
              'Success!',
              
            )}
              // .log("res", res);
            resolve(res);
          }), (err) => {
          Swal.fire(
            'Failed!',
                 )
          loading.dismiss();
          reject(err);
        };
    });
  }
}

}
