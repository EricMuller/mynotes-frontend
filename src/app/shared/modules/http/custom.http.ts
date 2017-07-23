import { Injectable, Inject } from '@angular/core';
import { Http, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout'

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private notifierService: NotifierService) {
    super(backend, defaultOptions);

  }

  /*request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    
    console.log('Before the request...');
    return super.request(url, this.jwt(options))
      .catch((err: any): any => {
        this.errorService.notifyError(err);
        return Observable.empty();
      })
      .retryWhen(error => error.delay(500))
      //.timeout(2000)
      .finally(() => {
        console.log('After the request...');
      });
  }*/

  get(url: string, timeout?: number, options?: RequestOptionsArgs): Observable<any> {
    console.debug('Before the get request...');
    let default_timeout: number = 20000000;
    if (timeout != null) {
      default_timeout = timeout;
    }
    return super.get(url, this.jwt(options))
      .timeout(50000)
      .catch((response) => {
        if (response.status === 400 || response.status === 422) {
          return Observable.throw(response);
        } else {
          let json = response.json();
          this.notifierService.notifyError(json.exception);
          return Observable.empty();
        }
      }

      )
      //.retryWhen(error => error.delay(500))
      //.timeout(default_timeout)
      .finally(() => {
        console.debug('After the request...');
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.debug('Before the post request...');
    console.debug(url);
    console.debug(body);
    return super.post(url, body, this.jwt(options))
      .catch((response) => {
      debugger
        if (response.status === 400 || response.status === 422 || response.status === 404 || response.status === 401 ) {
          return Observable.throw(response);
        } else {
          let contentType = response.headers.get('Content-Type');
          if ('application/json' == contentType) {
            let json = response.json();
            this.notifierService.notifyError(json.exception);
          } else {
            this.notifierService.notifyError(response._body);
          }
          return Observable.empty();
        }
      }
      )
      .finally(() => {
        console.debug('After the post request...');
      });
  }

  delete(url: string,  timeout?: number,options?: RequestOptionsArgs): Observable<any> {
    console.debug('Before the delete request...');
    console.debug(url);
    return super.delete(url,  this.jwt(options))
      .catch((response) => {
      
        if (response.status === 400 || response.status === 422 || response.status === 404) {
          return Observable.throw(response);
        } else {
          let contentType = response.headers.get('Content-Type');
          if ('application/json' == contentType) {
            let json = response.json();
            this.notifierService.notifyError(json.exception);
          } else {
            this.notifierService.notifyError(response._body);
          }
          return Observable.empty();
        }
      }
      )
      .finally(() => {
        console.debug('After the delete request...');
      });
  }

  private handleError(response: any) {
    if (response.status === 400 || response.status === 422) {
      return Observable.throw(response);
    } else {
      let json = response.json();
      this.notifierService.notifyError(json.exception);
      return Observable.empty();
    }
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.debug('Before the put request...');
    console.debug('url='+url);
    console.debug('body='+body);
    return super.put(url, body, this.jwt(options))
      .catch((response) => {
        if (response.status === 400 || response.status === 422) {
          return Observable.throw(response);
        } else {
          let json = response.json();
          this.notifierService.notifyError(json.exception);
          return Observable.empty();
        }
      }
      )
      .finally(() => {
        console.debug('After the put request...');
      });
  }

  public jwt(options?: RequestOptionsArgs): RequestOptionsArgs {
    // create authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('webmarks_token'));
    if (token) {
      //Bearer
      if (options != null && options.headers != null ) {
        options.headers.append('Authorization','Token ' + token);
      } else {
        let headers = new Headers({ 'Authorization': 'Token ' + token });
        return new RequestOptions({ headers: headers });
      }
    }
    return options;
  }

}