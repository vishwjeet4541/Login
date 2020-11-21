
import { environment } from 'src/environments/environment.prod';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';   

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url: string;
  userid: Object;
  constructor(private http: HttpClient) { }

  post(postData) {

    this.url = `${environment.apiHost}Users`;

    return this.http.get(this.url + '?username=' + postData.username + '&password=' + postData.password)

      .pipe(map(
        res => {
          console.log("In return", JSON.stringify(res));
          return JSON.stringify(res);
        },
        err => {
          return err;
        }
      ));
  }

 

}
