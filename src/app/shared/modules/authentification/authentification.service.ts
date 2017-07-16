import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from "rxjs/Observable"; // <- add this import
import { RequestOptions } from '@angular/http';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { AuthentificationEndPoint } from 'app/config/app.api.config'
import { Registration } from 'app/shared/modules/authentification/model/registration.model'


@Injectable()
export class AuthentificationService {

  constructor(private http: CustomHttp, private notifier: NotifierService,
    @Inject('authentification.endpoint') public endpoints: AuthentificationEndPoint) { }

  public login(username: string, password: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoints.login, JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        debugger
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
      });
  }

  public loginSocial(access_token: string, application: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoints.login + application + "/", JSON.stringify({ 'access_token': access_token }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let json = response.json();
        if (json && json.key) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          json.token = json.key;
          localStorage.setItem('currentUser', JSON.stringify(json));

        }
      });
  }



  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  public register(email: string, userName: string, password1: string, password2: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let registration = new Registration(email, userName, password1, password2);

    return this.http.post(this.endpoints.registration, registration, options)
      .map((response: Response) => {
        response.json();
      }
      );
    ;

  }

}