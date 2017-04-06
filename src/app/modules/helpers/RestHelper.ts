import {Injectable} from '@angular/core';

@Injectable()
export class RestHelper {

 static getContentTYpe(response: any) :any{ 
      return  response.headers.get('Content-Type');
 }
  
  static extractErrors(response: any) :any{ 
      let contentType = RestHelper.getContentTYpe(response);
      if (response.status === 404){
            response.exception =response.url + 'Not Found';
            return response
      }else{
        if ('application/json' == contentType) {
            return  response.json();
        }else{
            return  response;
        }
    }
      
  }

}