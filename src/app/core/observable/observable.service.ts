import { Injectable } from '@angular/core';



import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


export const NEW  = 0;
export const REMOVE  = 1;

export class Event {
  id: number;
  object: any;
}

@Injectable()
export class ObservableService {

  public producer = new Subject<Event>();

  constructor() {
  }

  public getObservable(): Observable<Event> {
    return this.producer.asObservable();
  }

  public add(object: any) {
    const event = new Event();
    event.id = NEW;
    event.object = object;
    this.producer.next(event);
  }

  public remove(object: any) {
    const event = new Event();
    event.id = REMOVE;
    event.object = object;
    this.producer.next(event);
  }

}
