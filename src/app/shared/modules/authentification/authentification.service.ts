import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from "rxjs/Observable"; // <- add this import
import { RequestOptions } from '@angular/http';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { CustomHttp } from 'app/shared/modules/http/custom.http'

@Injectable()
export class AuthentificationService {

  constructor(private http: CustomHttp, private notifier: NotifierService) { }

  public login(username: string, password: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api-token-auth/', JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         // localStorage.setItem('currentUser', JSON.stringify(user));
           localStorage.setItem('currentUser', JSON.stringify(user));
          
          
          this.notifier.notifySuccess('Successful connected',2000);
        }
      });
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
