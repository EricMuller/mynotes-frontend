import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormHelper {

  static updateFormWithRestResponse(restResponse:any, form: FormGroup) {
    if (restResponse.type == 'ValidationError') {
      debugger
      for (let key in restResponse.fields) {
        let fieldName = restResponse.fields[key].split(':')[0].trim()
        let message = restResponse.fields[key].split(':')[1]

        if (form.controls.hasOwnProperty(fieldName)) {
          let control = form.controls[fieldName];
          if ("non_field_errors" == fieldName) {
            control.setValue(message);
          } else {
            control.setErrors({ "message": message });
            control.markAsTouched();
          }
        } else {
          return false;
        }
      }
      return true;
    }else{
      debugger
      
    }
    return false;
  }

}