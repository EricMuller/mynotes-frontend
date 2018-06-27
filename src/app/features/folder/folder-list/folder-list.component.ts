import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PaginatedResult} from '../../../api/paginated-result';
import {Folder} from '../model/folder';
import {FolderService} from '../services/folder.service';
import {MatTabStore} from '../../shared/tab-store/tab-store.service';
import {BookmarkService} from '../../bookmark/services/bookmark.service';
import {NotifierService} from '../../../core/notifications/notifier.service';
import {FolderCreateDialogComponent} from '../folder-create-dialog/folder-create-dialog.component';
import {Bookmark} from '../../bookmark/model/bookmark';

class Stack<T> {
  _store: T[] = [];

  push(val: T) {
    this._store.push(val);
  }

  pop(): T | undefined {
    return this._store.pop();
  }

  current(): T | undefined {
    return this._store[this._store.length - 1];
  }
}

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {

  public folders: PaginatedResult = new PaginatedResult();
  public bookmarks: PaginatedResult = new PaginatedResult();

  public current: Folder;

  private path: Stack<Folder> = new Stack<Folder>();

  public modeEdition = false;

  @Output()
  public folderChange = new EventEmitter<Folder>();

  @Input('onlyFolder')
  public onlyFolder = false;

  constructor(private folderService: FolderService, private dialog: MatDialog, private notifier: NotifierService,
              private tabStore: MatTabStore,
              private bookmarkService: BookmarkService) {
  }

  ngOnInit() {
    this.searchByLevelId(0);
  }

  /**
   *
   */
  public browseParentFolder() {
    if (this.current.parent_id) {
      const current = this.path.pop();
      this.clearResult();
      this.searchByParentId(current.parent_id);
    } else {
      this.current = this.path.pop();
      this.clearResult();
      this.searchByLevelId(0);
    }
    this.current = this.path.current();

    this.folderChange.next(this.current);
  }

  /**
   * Call folderService search parent folder
   * @param folder
   */
  public browseFolder(folder: Folder) {
    this.current = folder;
    this.path.push(folder);
    this.clearResult();
    this.searchByParentId(folder.id);

    this.folderChange.next(this.current);
  }

  /**
   *  Call folderService search children folder
   * @param id
   */
  private searchByLevelId(id: number) {
    this.folderService.searchByLevel(id)
      .subscribe(
        result => {
          this.pushFolderResult(result);
        },
        err => {
          console.error(err);
        });
  }

  public updateFolder(folder) {

    this.folderService.saveFolder(folder)
      .subscribe(
        result => {
          this.notifier.notifyError('Folder Updated successfully!', 2000);
          folder.modeEdition = false;
        },
        err => {
          this.notifier.notifyError(err);

        });
  }

  /**
   *
   * @param id
   */
  private searchByParentId(id: number) {
    this.searchFolderByParentId(id);
    if (!this.onlyFolder) {
      this.searchBookmarkByParentId(id);
    }
  }

  private searchFolderByParentId(id: number) {
    this.folderService.searchByParentId(id)
      .subscribe(
        result => {
          console.log('result');
          this.pushFolderResult(result);

        },
        err => {
          console.error(err);
        });
  }

  private searchBookmarkByParentId(id: number) {
    this.folderService.searchBookmarksByFolder(id)
      .subscribe(
        result => {
          console.log('result');
          this.pushBookmarkResult(result);

        },
        err => {
          console.error(err);
        });
  }

  /**
   * Open DIALOG creation
   */
  public openFolderCreateDialog() {
    const config = new MatDialogConfig();
    if (this.current) {
      config.data = {parentId: this.current.id};
    }
    const dialogRef = this.dialog.open(FolderCreateDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.refresh();
      }

    });
  }

  /**
   * Call FolderService delete folder
   * @param folder
   */
  public deleteFolder(folder: Folder) {
    this.folderService.deleteFolder(folder)
      .subscribe(
        result => {
          this.notifier.notifyInfo('Folder ' + folder.name + ' Deleted.');
          this.refresh();
        },
        err => {
          console.error(err);
          this.notifier.notifyError('Error deleting' + folder.name + ' Deleted.');
        });
  }

  /**
   * Delete bookmark in  component array
   * @param bookmark
   */
  private removeBookmark(bookmark: Bookmark) {
    for (let i = 0; this.bookmarks.data.length > i; i++) {
      if (this.bookmarks.data[i].id === bookmark.id) {
        this.bookmarks.data.splice(i, 1);
      }
    }
  }

  /**
   * Call removeFolderToBookmark remove Bookmark in current folder
   * @param bookmark
   */
  public removeFolderToBookmark(bookmark: Bookmark) {
    this.bookmarkService.removeFolderToBookmark(bookmark.id, this.current.id)
      .subscribe(
        result => {
          this.notifier.notifyInfo(bookmark.title + ' Deleted.');
          this.removeBookmark(bookmark);
        },
        err => {
          console.error(err);
          this.notifier.notifyError('Error removing ' + bookmark.title + ' Deleted.');
        });

  }


  private refresh() {
    this.clearResult();
    if (this.current) {
      this.searchByParentId(this.current.id);
    } else {
      this.searchByLevelId(0);
    }
  }

  public breadcrumb(): string {
    let s = '';
    for (const node of this.path._store) {
      s += '/' + node.name;
    }
    return s === '' ? '/' : s;
  }

  private clearResult() {
    this.folders = new PaginatedResult();
    this.bookmarks = new PaginatedResult();
  }

  private pushFolderResult(result: PaginatedResult) {
    this.folders.links.next = result.links.next;
    for (let i = 0; result.data.length > i; i++) {
      const folder: Folder = result.data[i];
      this.folders.data.push(folder);
    }
  }

  private pushBookmarkResult(result: PaginatedResult) {
    this.bookmarks.links.next = result.links.next;
    for (let i = 0; result.data.length > i; i++) {
      const bookmark: Bookmark = result.data[i];
      this.bookmarks.data.push(bookmark);
    }
  }


  public detail(bookmark: Bookmark) {
    this.tabStore.navigate('detail', '/bookmark/detail', bookmark.id);
  }

}
