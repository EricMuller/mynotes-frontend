import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Notification} from './notifications.model';

@Injectable()
export class NotifierService {

  private static SUCCESS = 'alert alert-success';
  private static INFO = 'alert alert-info';
  private static WARNING = 'alert alert-warning';
  private static DANGER = 'alert alert-danger';

  private _notifications = new Subject<Notification>();

  public observable = this._notifications.asObservable();

  public notifySuccess(message: string, timeOut: number = 1000) {
    this._notifications.next(new Notification(NotifierService.SUCCESS, message, timeOut));
  }

  public notifyInfo(message: string, timeOut: number = 1000) {
    this._notifications.next(new Notification(NotifierService.INFO, message, timeOut));
  }

  public notifyWarn(message: string, timeOut: number = 0) {
    this._notifications.next(new Notification(NotifierService.WARNING, message, timeOut));
  }

  public notifyError(message: string, timeOut: number = 0) {
    this._notifications.next(new Notification(NotifierService.DANGER, message, timeOut));
  }

}
