import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'

//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';
import { Bookmark } from '../model/bookmark';
import { Filter } from '../model/filter';
// import { NOTES } from './mock-notes';

import { ApiService } from 'app/shared/modules/api/api.service';
import { PaginatedResult } from 'app/shared/modules/api/paginated-result'
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class BookmarkService {

  private observable: Observable<PaginatedResult>;

  constructor(private apiService: ApiService) {
    console.log('BookmarkService constructor');
  }

  public createBookmark(url: string): Observable<any> {
    let bookmark: Bookmark = new Bookmark();
    bookmark.url = url;
    bookmark.title = url;
    return this.apiService.post(this.apiService.endPoints.bookmarks, bookmark);

  }

  public deleteBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.apiService.deleteById(this.apiService.endPoints.bookmarks, bookmark.id.toString());
    }

  }

  public trash(bookmark: Bookmark): Observable<any> {
    bookmark.status = 'T';
    return this.saveBookmark(bookmark);

  }

  public addFolderToBookmark(bookmarkId: number, folderId: number): Observable<any> {
        return this.apiService.put(this.apiService.endPoints.bookmarks + bookmarkId.toString() + "/folders/", { id: folderId });
  }
  public removeFolderToBookmark(bookmarkId: number, folderId: number): Observable<any> {
        return this.apiService.deleteById(this.apiService.endPoints.bookmarks + bookmarkId.toString() + "/folders/",  folderId.toString() );
  }

  public saveBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.apiService.put(this.apiService.endPoints.bookmarks + bookmark.id + "/", bookmark);
    } else {
      return this.apiService.post(this.apiService.endPoints.bookmarks, bookmark);
    }
  }

  private createDjangoFilter(filterSearch: Filter, pre: string): string {
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
        filter = filter + '&kind=' + filterSearch.kind;
      }
    }

    filter = filter + "&ordering=-updated_dt";
    return filter
  }

  public search(filterSearch: Filter): Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch, "?");

    let obs: Observable<PaginatedResult> = this.apiService.getPaginatedResults(this.apiService.endPoints.bookmarks + filter);

    return obs;
  }



  public getNextPaginatedResults(url: string, filterSearch: Filter): Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch, "&");
    return this.apiService.getPaginatedResults(url + filter);
  }

  public getPaginatedResults(url: string, filterSearch: Filter): Observable<PaginatedResult> {

    let filter = this.createDjangoFilter(filterSearch, "&");
    return this.apiService.getPaginatedResults(url + filter);
  }

  public findById(id: number): Observable<Bookmark> {
    return this.apiService.getById(this.apiService.endPoints.bookmarks, id.toString());
  }

  public archiveBookmark(bookmark: Bookmark): Observable<any> {
    //crawl
    return this.apiService.getByIdWithParams(this.apiService.endPoints.bookmarks, bookmark.id.toString(), 'archive', 50000);
  }

  public loadTitle(url: string): Observable<any> {
    return this.apiService.getById(this.apiService.endPoints.bookmarks, btoa(url) + "/title", 50000);
  }

  public urlHtml(bookmark: Bookmark) {
    return this.apiService.endPoints.archive + bookmark.archive_id + ".html"
  }

  public urlDownload(bookmark: Bookmark) {
    return this.apiService.endPoints.archive + bookmark.archive_id + "/download/"
  }

}
