
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';


/*export let httpFactory = (backend: XHRBackend, defaultOptions: RequestOptions, notifier:NotifierService) => {
  return new CustomHttp(backend, defaultOptions, notifier);
};*/

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, notifier: NotifierService) {
  return  new CustomHttp(backend, defaultOptions, notifier);
}

export let  HTTP_PROVIDER =
  {
    provide: CustomHttp,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions, NotifierService]
  };