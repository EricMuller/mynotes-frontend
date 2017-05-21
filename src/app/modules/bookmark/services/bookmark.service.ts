import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'

//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';
import { Bookmark } from '../model/bookmark';
import { Filter } from '../model/filter';
// import { NOTES } from './mock-notes';

import { ApiService } from 'app/shared/modules/api/api.service';
import { ResponseService } from 'app/shared/services/response.service'
import { PaginatedResult } from 'app/shared/services/paginated-result'
import { BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class BookmarkService {

  private observable: Observable<PaginatedResult>;

  //private _webmarks: BehaviorSubject<PaginatedResult> = new BehaviorSubject(new PaginatedResult());

  /*public cache: {
    webmarks: PaginatedResult[]
  };*/

  constructor(private apiService: ApiService) {
    console.log('BookmarkService constructor');
  }

  /*get result(): Observable<PaginatedResult> {
    return this._webmarks.asObservable();
  }*/

 /* public getObservable(): Observable<PaginatedResult> {
    if (this.observable) {
      return this.observable;
    } else {
      console.log('observable is null');
      return Observable.of(new PaginatedResult())
    }
  }*/

  public createBookmark(url: string): Observable<any> {
    let bookmark: Bookmark = new Bookmark();
    bookmark.url = url;
    bookmark.title = url;
    return this.apiService.post(this.apiService.myWebmarksEndPoint.bookmarks, bookmark);

  }

  public deleteBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.apiService.deleteById(this.apiService.myWebmarksEndPoint.bookmarks, bookmark.id.toString());
    }

  }

  public trash(bookmark: Bookmark): Observable<any> {
    bookmark.status = 'T';
    return this.saveBookmark(bookmark);

  }

  public saveBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.apiService.put(this.apiService.myWebmarksEndPoint.bookmarks + bookmark.id + "/", bookmark);
    } else {
      return this.apiService.post(this.apiService.myWebmarksEndPoint.bookmarks, bookmark);
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
          filter = filter + '&kind='+filterSearch.kind;
      }
    }
   
    filter = filter + "&ordering=-updated_dt" ;
    return filter
  }

  public search(filterSearch: Filter): Observable<PaginatedResult> {
   
    let filter = this.createDjangoFilter(filterSearch,"?");

    let obs :Observable<PaginatedResult>  = this.apiService.getPaginatedResults(this.apiService.myWebmarksEndPoint.bookmarks + filter);

    /*obs.subscribe(
      result => {
        //this.cache.webmarks.slice(0);
        //this.cache.webmarks.push(result);
        //this.pushNotes(result)
        this._webmarks.next(result);
      },
      err => {
        console.error(err);
    });
*/
    return obs;
  }


  public getNextPaginatedResults(url: string,filterSearch: Filter) :Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch,"&");
    return  this.apiService.getPaginatedResults(url+filter) ;
    /*.subscribe( result => {
        this._webmarks.next(result);
      },
      err => {
        console.error(err);
    });*/

  }

  public getPaginatedResults(url: string,filterSearch: Filter): Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch,"&");
    return this.apiService.getPaginatedResults(url+filter);
  }

  public findById(id: number): Observable<Bookmark> {
    return this.apiService.getById(this.apiService.myWebmarksEndPoint.bookmarks, id.toString());
  }

  public archiveBookmark(bookmark:Bookmark): Observable<any> {
    //crawl
    return this.apiService.getByIdWithParams(this.apiService.myWebmarksEndPoint.bookmarks, bookmark.id.toString(),'archive', 50000);
    //return this.apiService.getById(this.apiService.config.crawler, btoa(url), 50000);
  }

  public loadTitle(url: string): Observable<any> {
    return this.apiService.getById(this.apiService.myWebmarksEndPoint.bookmarks, btoa(url) + "/title", 50000);
  }

   public urlHtml(bookmark: Bookmark) {
      return this.apiService.myWebmarksEndPoint.archive + bookmark.archive_id + ".html"
   }

  public urlDownload(bookmark: Bookmark) {
    return this.apiService.myWebmarksEndPoint.archive + bookmark.archive_id + "/download/"
  }

}
