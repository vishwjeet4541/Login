import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  private http: HttpClient;
   constructor(handler: HttpBackend,
      private router: Router,) { this.http = new HttpClient(handler);}

  login(postData): Observable<any> {
    this.url = `${environment.apiHost}Login`;
    const httpPostOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url, postData, httpPostOptions2).pipe(
      map(res => {
       return AES.encrypt(JSON.stringify(res),'Test').toString();
      }),
    );
    
  }
 
  userCreation(data) {
  
    this.url = `${environment.apiHost}Users`;
    return this.http.post(this.url, data);
  }

 

}
