import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  data: any;
  data1: any;
  UserName: any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let val = sessionStorage.getItem('loggedInUser')
    this.data  = AES.decrypt(val,'Test').toString(utf8);
    this.data1 = JSON.parse(this.data)
    console.log("Token",this.data1.token)
    // this.UserName =  this.data1.token;
    const token = "Bearer " + this.data1.token;
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
