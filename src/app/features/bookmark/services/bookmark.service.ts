import {Injectable} from '@angular/core';

import {Bookmark} from '../model/bookmark';
import {Filter} from '../model/filter';
import {PaginatedResult} from '../../../api/paginated-result';
import {HttpService} from '../../../api/http.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BookmarkService {

  private observable: Observable<PaginatedResult>;

  constructor(private httpService: HttpService) {
    console.log('BookmarkService constructor');
  }

  public createBookmark(url: string): Observable<any> {
    const bookmark = new Bookmark();
    bookmark.url = url;
    bookmark.title = url;
    return this.httpService.post(this.httpService.endPoints.bookmarks, bookmark);

  }

  public deleteBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.httpService.deleteById(this.httpService.endPoints.bookmarks, bookmark.id.toString());
    }

  }

  public trash(bookmark: Bookmark): Observable<any> {
    bookmark.status = 'T';
    return this.saveBookmark(bookmark);

  }

  public addFolderToBookmark(bookmarkId: number, folderId: number): Observable<any> {
    return this.httpService.put(this.httpService.endPoints.bookmarks + bookmarkId.toString() + '/folders/', {id: folderId});
  }

  public removeFolderToBookmark(bookmarkId: number, folderId: number): Observable<any> {
    return this.httpService.deleteById(this.httpService.endPoints.bookmarks + bookmarkId.toString() + '/folders', folderId.toString());
  }

  public saveBookmark(bookmark: Bookmark): Observable<any> {
    if (bookmark.id > 0) {
      return this.httpService.put(this.httpService.endPoints.bookmarks + bookmark.id + '/', bookmark);
    } else {
      return this.httpService.post(this.httpService.endPoints.bookmarks, bookmark);
    }
  }

  private createDjangoFilter(filterSearch: Filter, pre: string): string {
    let filter: string = pre;

    if (filterSearch != null) {
      for (let i = 0; filterSearch.tags.length > i; i++) {
        // tagIds.push(search.tags[i].id);
        filter = filter + 'tags=' + filterSearch.tags[i].id + '&';
      }
      if (!filterSearch.trash) {
        filter = filter + '&status!=T';
      }

      if (filterSearch.type !== '') {
        filter = filter + '&kind=' + filterSearch.kind;
      }
    }

    return  filter + '&ordering=-updated_dt';
  }

  public search(filterSearch: Filter): Observable<PaginatedResult> {

    const filter = this.createDjangoFilter(filterSearch, '?');

    return  this.httpService.getPaginatedResults(this.httpService.endPoints.bookmarks + filter);

  }


  public getNextPaginatedResults(url: string, filterSearch: Filter): Observable<PaginatedResult> {

    const filter = this.createDjangoFilter(filterSearch, '&');
    return this.httpService.getPaginatedResults(url + filter);
  }

  public getPaginatedResults(url: string, filterSearch: Filter): Observable<PaginatedResult> {

    const filter = this.createDjangoFilter(filterSearch, '&');
    return this.httpService.getPaginatedResults(url + filter);
  }

  public findById(id: number): Observable<Bookmark> {
    return this.httpService.getById(this.httpService.endPoints.bookmarks, id.toString());
  }

  /**
   * Crawl and store
   * @param bookmark
   */
  public storeBookmark(bookmark: Bookmark): Observable<any> {
    return this.httpService.getByIdWithParams(this.httpService.endPoints.bookmarks, bookmark.id.toString(), 'store', 50000);
  }

  public loadTitle(url: string): Observable<any> {
    return this.httpService.getById(this.httpService.endPoints.bookmarks, btoa(url) + '/title', 50000);
  }

  public urlHtml(bookmark: Bookmark) {
    return this.httpService.endPoints.storages + bookmark.archive_id + '.html';
  }

  public urlDownload(bookmark: Bookmark) {
    return this.httpService.endPoints.storages + bookmark.archive_id + '/download/';
  }

}
