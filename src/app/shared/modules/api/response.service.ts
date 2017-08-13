import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ResponseService {

  constructor() { }

  public extractBody(response: Response) {
    let body = response.json();
    console.log("Extract body =" + body);
    return body || {};
  }

  public handleError(error: Response | any): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(error);
  }
  
}
