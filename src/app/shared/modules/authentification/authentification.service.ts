import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from "rxjs/Observable"; // <- add this import
import { RequestOptions } from '@angular/http';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { AuthentificationEndPoint } from 'app/config/app.api.config'
import { Registration } from 'app/shared/modules/authentification/model/registration.model'
import { Token } from 'app/shared/modules/authentification/model/token.model'
import { ResponseService } from 'app/shared/modules/api/response.service'

@Injectable()
export class AuthentificationService {

  constructor(private http: CustomHttp, private notifier: NotifierService,
    @Inject('authentification.endpoint') public endpoints: AuthentificationEndPoint,private response: ResponseService) { }
  /**
   * 
   * @param username 
   * @param password 
   */
  public login(username: string, password: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoints.login, JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token:Token = response.json();
        if (token && token.key) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('webmarks_token', JSON.stringify(token.key));
        }
      });
  }

  /**
   * 
   * @param access_token 
   * @param application 
   */
  public loginSocial(access_token: string, application: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoints.login + application + "/", JSON.stringify({ 'access_token': access_token }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token:Token = response.json();
        if (token && token.key) {
          localStorage.setItem('webmarks_token', JSON.stringify(token.key));
        }
      });
  }
  /**
   * get curent user
   */
  public user():Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.endpoints.user)
      .map(this.response.extractBody)
            .catch(this.response.handleError) ;
  }

  /**
   * logout
   */
  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('webmarks_token');
    localStorage.removeItem('webmarks_user');
    
  }

  /**
   * register a new user
   * @param email 
   * @param userName 
   * @param password1 
   * @param password2 
   */
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