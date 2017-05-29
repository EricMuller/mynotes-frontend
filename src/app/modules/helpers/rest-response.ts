

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