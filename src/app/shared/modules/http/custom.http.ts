import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout'

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private errorService: NotifierService) {
    super(backend, defaultOptions);
    
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    
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
  }

  get(url: string, timeout?: number,options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the get request...');
    let default_timeout:number =20000000;
    if (timeout != null){
      default_timeout=timeout;
    }
    return super.get(url, this.jwt(options))
      .timeout(50000)
      .catch((err: any): any => {
        if (err.status === 400 || err.status === 422) {
          return Observable.throw(err);
        } else {
          this.errorService.notifyError(err);
          return Observable.empty();
        }
      })
      
      //.retryWhen(error => error.delay(500))
      //.timeout(default_timeout)
     .finally(() => {
        console.log('After the request...');
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the post request...');
    console.log(url);
    console.log(body);
    return super.post(url, body, this.jwt(options))
      .catch((err: any): any => {
        if (err.status === 400 || err.status === 422) {
          return Observable.throw(err);
        } else {
          this.errorService.notifyError(err);
          return Observable.empty();
        }
      })
      .finally(() => {
        console.log('After the post request...');
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the put request...');
    console.log(url);
    console.log(body);
    return super.put(url, body, this.jwt(options))
      .catch((err: any): any => {
        if (err.status === 400 || err.status === 422) {
          return Observable.throw(err);
        } else {
          this.errorService.notifyError(err);
          return Observable.empty();
        }
      })
      .finally(() => {
        console.log('After the put request...');
      });
  }

  public jwt(options?: RequestOptionsArgs): RequestOptionsArgs{
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            //Bearer
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token });
           if(options != null){
             options.headers = headers;
           }else{
             return new RequestOptions({ headers: headers });
           }
        }
        return options;
    }

}