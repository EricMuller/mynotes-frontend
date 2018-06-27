import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookmarkService} from '../services/bookmark.service';
import {FilterService} from '../services/search.service';
import {Bookmark} from '../model/bookmark';
import {Filter} from '../model/filter';

import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Tag} from '../../tags/model/tag';
import {NotifierService} from '../../../core/notifications/notifier.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MatTabStore} from '../../shared/tab-store/tab-store.service';
import {PaginatedResult} from '../../../api/paginated-result';
import {FolderSelectDialogComponent} from '../../folder/folder-select-dialog/folder-select-dialog.component';
import {Subscription} from 'rxjs/Subscription';


/*export function asObservable(subject: Subject) {
    return new Observable(fn => subject.subscribe(fn));
}*/


@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
  // providers: [NotificationsService],
})
export class WebmarkListComponent implements OnInit, OnDestroy {

  private _notes: BehaviorSubject<List<Bookmark>> = new BehaviorSubject(List([]));

  public showResult = true;

  public tags: Observable<List<Tag>>;

  public bookmarks: Array<any> = [];

  public links: any = {};

  public modeEdition = false;

  constructor(private bookmarkService: BookmarkService, private filterService: FilterService
    , private notifier: NotifierService, private tabStore: MatTabStore, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  /**
   * Call bookmarkService search fist page  according the current filter
   */
  public search() {
    this.bookmarkService.search(this.filterService.filter)
      .subscribe(
        result => {
          // this.clear();
          this.bookmarks.splice(0);
          this.pushBookmarks(result);
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
    this.bookmarkService.getPaginatedResults(this.links.next, this.filterService.filter )
      .subscribe(
        result => {
          this.pushBookmarks(result);
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
      this.bookmarkService.storeBookmark(bookmark).subscribe(archive => {
        bookmark.archive_id = archive.id;
        this.notifier.notifyInfo('Archived with Succes');
      });
    }
  }

  /**
   * Delete bookmark in  component array
   * @param bookmark
   */
  private removeBookmark(bookmark: Bookmark) {
    for (let i = 0; this.bookmarks.length > i; i++) {
      if (this.bookmarks[i].id === bookmark.id) {
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
    for (let i = 0; result.data.length > i; i++) {
      const bookmark: Bookmark = result.data[i];
      this.bookmarks.push(bookmark);
    }
  }

  /**
   * Open Select Dialog
   */
  public openFolderCreateDialog(id: string) {
    const config = new MatDialogConfig();

    config.data = {bookmarkId: id};


    const dialogRef = this.dialog.open(FolderSelectDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        // this.refresh();
      }
    });
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
    this.tabStore.navigate('detail', '/bookmark/detail', bookmark.id);
  }

  ngOnDestroy() {
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

export const routerConfig = [{
  path: '',
  component: WebmarkListComponent
}];
