
import {RequestOptions, XHRBackend} from '@angular/http';
import {NotifierService} from '../notifications/notifier.service';
import {CustomHttp} from './custom.http';


/*export let httpFactory = (backend: XHRBackend, defaultOptions: RequestOptions, notifier:NotifierService) => {
  return new CustomHttp(backend, defaultOptions, notifier);
};*/

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, notifier: NotifierService) {
  return new CustomHttp(backend, defaultOptions, notifier);
}

export let HTTP_PROVIDER = {
  provide: CustomHttp,
  useFactory: httpFactory,
  deps: [XHRBackend, RequestOptions, NotifierService]
};
