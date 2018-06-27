import {Inject, Injectable} from '@angular/core';
import {Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Token} from './model/token.model';
import {AuthentificationEndPoint} from '../../api/auth/api-auth.config';
import {NotifierService} from '../../core/notifications/notifier.service';
import {ResponseService} from '../../api/response.service';
import {CustomHttp} from '../../core/http/custom.http';
import {Registration} from './model/registration.model'; // <- add this import


@Injectable()
export class AuthentificationService {

  constructor(private http: CustomHttp, private notifier: NotifierService,
              @Inject('authentification.endpoint') public endpoints: AuthentificationEndPoint, private response: ResponseService) {
  }

  /**
   *
   * @param username
   * @param password
   */
  public login(username: string, password: string): Observable<any> {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.endpoints.login, JSON.stringify({username: username, password: password}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token: Token = response.json();
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

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.endpoints.login + application + '/', JSON.stringify({'access_token': access_token}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token: Token = response.json();
        if (token && token.key) {
          localStorage.setItem('webmarks_token', JSON.stringify(token.key));
        }
      });
  }

  /**
   * get curent user
   */
  public user(): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.customGet(this.endpoints.user)
      .map(this.response.extractBody)
      .catch(this.response.handleError);
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

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    const registration = new Registration(email, userName, password1, password2);

    return this.http.post(this.endpoints.registration, registration, options)
      .map((response: Response) => {
          response.json();
        }
      );


  }

}
