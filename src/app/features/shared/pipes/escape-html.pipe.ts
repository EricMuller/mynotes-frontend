import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapeHtml'
})
export class EscapeHtmlPipe implements PipeTransform {

 

  transform(value: any, args?: any): any {
    
      return null;
       //return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
