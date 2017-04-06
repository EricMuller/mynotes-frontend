import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'

//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';
import { Note } from '../model/note';
import { Filter } from '../model/filter';
// import { NOTES } from './mock-notes';

import { ApiService } from 'app/shared/modules/api/api.service';
import { ResponseService } from 'app/shared/services/response.service'
import { PaginatedResult } from 'app/shared/services/paginated-result'

@Injectable()
export class NoteService {

  private observable: Observable<PaginatedResult>;

  private dataStore: {
    todos: Note[]
  };

  constructor(private apiService: ApiService) {
    console.log('NoteService constructor');
  }

  public getNotes(): Observable<PaginatedResult> {
    if (this.observable) {
      return this.observable;
    } else {
      console.log('observable is null');
      return Observable.of(new PaginatedResult())
    }
  }

  public createNote(url: string): Observable<any> {
    let note: Note = new Note();
    note.url = url;
    note.title = url;
    return this.apiService.post(this.apiService.myNotesEndPoint.notes, note);

  }

  public deleteNote(note: Note): Observable<any> {
    if (note.id > 0) {
      return this.apiService.deleteById(this.apiService.myNotesEndPoint.notes, note.id.toString());
    }

  }

  public trash(note: Note): Observable<any> {
    note.status = 'T';
    return this.saveNote(note);

  }

  public saveNote(note: Note): Observable<any> {
    if (note.id > 0) {
      return this.apiService.put(this.apiService.myNotesEndPoint.notes + note.id + "/", note);
    } else {
      return this.apiService.post(this.apiService.myNotesEndPoint.notes, note);
    }
  }

  private createDjangoFilter(filterSearch: Filter,pre: string): string {
    let filter: string = pre;

    if (filterSearch != null) {
      for (var i = 0; filterSearch.tags.length > i; i++) {
        //tagIds.push(search.tags[i].id);
        filter = filter + 'tags=' + filterSearch.tags[i].id + '&';
      }
      if (!filterSearch.trash) {
        filter = filter + '&status!=T';
      }

      if (filterSearch.type != "") {
          filter = filter + '&type='+filterSearch.type;
      }
    }
   
    filter = filter + "&ordering=-updated_dt" ;
    return filter
  }

  public search(filterSearch: Filter): Observable<PaginatedResult> {
    //console.log(tags);
    //?tags=4&tags=1
    let filter = this.createDjangoFilter(filterSearch,"?");
    this.observable = this.apiService.getPaginatedResults(this.apiService.myNotesEndPoint.notes + filter);
    return this.observable;
  }

  /*public search(tags: number[], trash: boolean): Observable<PaginatedResult> {
    //console.log(tags);
    //?tags=4&tags=1
    let filter: string = "?";
    if (tags.length > 0) {
      for (var i = 0; tags.length > i; i++) {
        filter = filter + 'tags=' + tags[i] + '&'
      }
    }
    if (!trash) {
      filter = filter + '&status!=T'
    }
    filter = filter + "&ordering=-updated_dt"
    this.observable = this.apiService.getPaginatedResults(this.apiService.config.notes + filter);
    return this.observable;
  }*/

  public getPaginatedResults(url: string,filterSearch: Filter): Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch,"&");
    return this.apiService.getPaginatedResults(url+filter);
  }

  public findById(id: number): Observable<Note> {
    return this.apiService.getById(this.apiService.myNotesEndPoint.notes, id.toString());
  }

  public archiveNote(note:Note): Observable<any> {
    //crawl
    return this.apiService.getByIdWithParams(this.apiService.myNotesEndPoint.notes, note.id.toString(),'archive', 50000);
    //return this.apiService.getById(this.apiService.config.crawler, btoa(url), 50000);
  }

  public loadTitle(url: string): Observable<any> {
    return this.apiService.getById(this.apiService.myNotesEndPoint.notes, btoa(url) + "/title", 50000);
  }

  

}
