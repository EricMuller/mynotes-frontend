import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestResponse } from './rest-response';


export class Field {

}

@Injectable()
export class RestHelper {

  static getContentType(response: any): any {
    return response.headers.get('Content-Type');
  }

  static getRestResponse(response: any): RestResponse {
    let contentType = RestHelper.getContentType(response);
    if (response.status === 404) {
      let restResponse = new RestResponse("UrlNotFoundError", response.url + 'Not Found', null);
      return restResponse;

    } else {
      if ('application/json' == contentType) {
        let body = response.json();
        let restResponse = new RestResponse(body.error_class_name, body.exception, body.fields);
        return restResponse

      } else {
        let restResponse = new RestResponse('UnknownError', response, null);
        return restResponse
      }
    }

  }


}