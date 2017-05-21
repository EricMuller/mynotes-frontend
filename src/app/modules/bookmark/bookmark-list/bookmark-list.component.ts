import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { FilterService } from '../services/search.service';
import { Bookmark } from '../model/bookmark';
import { Filter } from '../model/filter';
import { RouterModule } from '@angular/router';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { PaginatedResult } from 'app/shared/services/paginated-result'
import { TagService } from 'app/modules/tags/services/tag.service'
import { TagCount } from 'app/modules/tags/model/tag-count'
import { Tag } from 'app/modules/tags/model/tag'
import { Subscription } from 'rxjs/Rx';
import { ObservableService } from 'app/shared/modules/observable/observable.service'
import { NEW } from 'app/shared/modules/observable/observable.service'
import { ApiService } from 'app/shared/modules/api/api.service';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import { Subject } from "rxjs/Subject";
import { MdTabStore, MdTab } from 'app/modules/tab-store/tab-store.service'
import { Router } from '@angular/router';
export const routerConfig = [{
  path: '',
  component: WebmarkListComponent
}];


/*export function asObservable(subject: Subject) {
    return new Observable(fn => subject.subscribe(fn));
}*/


@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
  //providers: [NotificationsService],
})
export class WebmarkListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  private _notes: BehaviorSubject<List<Bookmark>> = new BehaviorSubject(List([]));

  private filter: Filter;

  public showResult: boolean;

  public tags: Observable<List<Tag>>;

  public bookmarks: Array<any> = [];

  public links: any = {};

  constructor(private bookmarkService: BookmarkService, private searchService: FilterService
    , private notifier: NotifierService, private tabStore: MdTabStore) {
    this.filter = this.searchService.get();
  }

  ngOnInit() {
  }

  /**
   * Call bookmarkService search fist page  according the current filter
   */
  public search() {
    this.bookmarkService.search(this.filter)
      .subscribe(
      result => {
        //this.clear();
        this.bookmarks.splice(0);
        this.pushBookmarks(result)
        this.showResult = true;
      },
      err => {
        console.error(err);
      });
  }

  /**
   * Call bookmarkService search next page results 
   * @param event 
   */
  public next(event) {
    this.bookmarkService.getPaginatedResults(this.links.next, this.filter)
      .subscribe(
      result => {
        this.pushBookmarks(result)
      },
      err => {
        console.error(err);
      });
  }

  

  /**
   * Call BookmarkService update bookmark status  as delete
   * @param bookmark 
   */
  public trash(bookmark: Bookmark) {
    this.bookmarkService.trash(bookmark).subscribe(result => {
      this.notifier.notifyInfo('Send to trash with Succes');
    },
      err => {
        console.error(err);
        this.notifier.notifyError('Error deleting' + bookmark.title + ' Deleted.');
      }
    );
  }

  /**
   * Call BookmarkService remove bookmark in db
   * @param bookmark 
   */
  public delete(bookmark: Bookmark) {
    this.bookmarkService.deleteBookmark(bookmark)
      .subscribe(
      result => {
        this.notifier.notifyInfo(bookmark.title + ' Deleted.');
        this.removeBookmark(bookmark);
      },
      err => {
        console.error(err);
        this.notifier.notifyError('Error deleting ' + bookmark.title + ' Deleted.');
      });

  }

 /**
  *  Call BookmarkService archive bookmark content  in db
  * @param evt 
  * @param bookmark 
  */
  public archive(evt, bookmark: Bookmark) {
    if (bookmark) {
      this.bookmarkService.archiveBookmark(bookmark).subscribe(archive => {
        bookmark.archive_id = archive.id
        this.notifier.notifyInfo('Archived with Succes');
      });
    }
  }


/**
   * Delete bookmark in  component array 
   * @param bookmark 
   */
  private removeBookmark(bookmark: Bookmark) {
    for (var i = 0; this.bookmarks.length > i; i++) {
      if (this.bookmarks[i].id == bookmark.id) {
        this.bookmarks.splice(i, 1);
      }
    }
  }

  /**
   * Push results in component Array
   * @param result 
   */
  private pushBookmarks(result: PaginatedResult) {
    this.links.next = result.links.next;
    for (var i = 0; result.data.length > i; i++) {
      let bookmark: Bookmark = result.data[i];
      this.bookmarks.push(bookmark);
    }
  }

 

  /*public getTags() {

    let map = new Map();
    for (var i = 0; this.data.length > i; i++) {
      let note: Bookmark = this.data[i];
      for (let t of note.tags) {
        map.set(t.id, t);
      }
    }

    //for(let v in map.values())
    // this.tags.next(v);

  }*/


  public detail(bookmark: Bookmark) {
    this.tabStore.navigate('detail','/bookmark/detail', bookmark.id);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  get notes() {
    return Observable.of(this._notes);
  }

  public notification() {
    console.error('notification');
    this.notifier.notifyError('test');
  }

  public clear() {
    this.bookmarks.slice(0);
    this.links = {};
  }

  public showSearch(evt) {
    this.showResult = false;
  }

  public isAuthentified(): boolean {
    return true;
  }

  public urlHtml(bookmark: Bookmark) {
    return this.bookmarkService.urlHtml(bookmark);
  }

  public urlDownload(bookmark: Bookmark) {
    return this.bookmarkService.urlDownload(bookmark);
  }


}