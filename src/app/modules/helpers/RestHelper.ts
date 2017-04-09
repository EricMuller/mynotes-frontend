import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
export class RestResponse {
  constructor(className, exception, fields) {
    this.type = className;
    this.exception = exception;
    this.fields = fields;
  };
  type: string;
  exception: string;
  fields: any;

}

export class Field {

}

@Injectable()
export class RestHelper {

  static getContentTYpe(response: any): any {
    return response.headers.get('Content-Type');
  }

  static extractErrors(response: any): any {
    let contentType = RestHelper.getContentTYpe(response);
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