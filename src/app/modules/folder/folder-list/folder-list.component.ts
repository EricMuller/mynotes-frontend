import { Component, OnInit } from '@angular/core';
import { PaginatedResult } from 'app/shared/services/paginated-result'

import { FolderService } from 'app/modules/folder/services/folder.service'
import { Folder } from 'app/modules/folder/model/folder'
import { FolderCreateDialogComponent } from 'app/modules/folder/folder-create-dialog/folder-create-dialog.component'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { MdDialog, MdDialogConfig } from '@angular/material';

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

  public result: PaginatedResult = new PaginatedResult();

  public current: Folder;

  private path: Stack<Folder> = new Stack<Folder>();

  constructor(private folderService: FolderService, private dialog: MdDialog, private notifier: NotifierService) { }

  ngOnInit() {
    this.searchByLevelId(0);
  }

  public breadcrumb(): string {
    let s = "";
    for (let node of this.path._store) {
      s += "/" + node.name;
    }
    return s == "" ? "/" : s;
  }
  public browseParentFolder() {
    if (this.current.parent_id) {
      let current = this.path.pop();
      this.clearResult();
      this.searchByParentId(current.parent_id);
    } else {
      this.current = this.path.pop();
      this.clearResult();
      this.searchByLevelId(0);
    }
    this.current = this.path.current();
  }

  public browseFolder(folder: Folder) {
    this.current = folder;
    this.path.push(folder);
    this.clearResult();
    this.searchByParentId(folder.id);
  }

  private searchByLevelId(id: number) {
    this.folderService.searchByLevel(id)
      .subscribe(
      result => {
        this.pushResult(result)
      },
      err => {
        console.error(err);
      });
  }

  private searchByParentId(id: number) {
    this.folderService.searchByParentId(id)
      .subscribe(
      result => {
        console.log('result');
        this.pushResult(result)

      },
      err => {
        console.error(err);
      });
  }

  private clearResult() {
    this.result = new PaginatedResult();
  }

  private pushResult(result: PaginatedResult) {
    this.result.links.next = result.links.next;
    for (var i = 0; result.data.length > i; i++) {
      let folder: Folder = result.data[i];
      this.result.data.push(folder);
    }
  }

  public openFolderCreateDialog() {
    let config = new MdDialogConfig();
    if (this.current) {
      config.data = { parentId: this.current.id }
    }

    let dialogRef = this.dialog.open(FolderCreateDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result == 'ok') {
        this.refresh();
      };
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

  public deleteFolder(folder: Folder) {
    this.folderService.deleteFolder(folder)
      .subscribe(
      result => {
        this.notifier.notifyInfo('Note' + folder.name + ' Deleted.');
        this.refresh();
      },
      err => {
        console.error(err);
        this.notifier.notifyError('Error deleting' + folder.name + ' Deleted.');
      });

  }

}
