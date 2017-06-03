import { Injectable } from '@angular/core';
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//import { SearchNoteResult } from './search-note-result';

import { ApiService } from 'app/shared/modules/api/api.service';

import { Subject } from 'rxjs/Rx';

export const NEW :number = 0; 
export const REMOVE :number = 1;

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
    let event = new Event();
    event.id = NEW;
    event.object = object;
    this.producer.next(event);
  }

  public remove(object: any) {
    let event = new Event();
    event.id = REMOVE;
    event.object = object;
    this.producer.next(event);
  }

}
