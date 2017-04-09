import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FilterService } from '../services/search.service';
import { Note } from '../model/note';
import { Filter } from '../model/filter';
import { RouterModule } from '@angular/router';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { PaginatedResult } from 'app/shared/services/paginated-result'
import { TagService } from 'app/modules/tags/services/tag.service'
import { TagCloud } from 'app/modules/tags/model/tag-cloud'
import { Tag } from 'app/modules/tags/model/tag'
import { Subscription } from 'rxjs/Rx';
import { ObservableService } from 'app/shared/modules/observable/observable.service'
import { NEW } from 'app/shared/modules/observable/observable.service'
import { MdSnackBar } from '@angular/material';
import { ApiService } from 'app/shared/modules/api/api.service';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import {Subject} from "rxjs/Subject";


export const routerConfig = [{
  path: '',
  component: NoteListComponent
}];

/*export function asObservable(subject: Subject) {
    return new Observable(fn => subject.subscribe(fn));
}*/

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  //providers: [NotificationsService],
})
export class NoteListComponent implements OnInit, OnDestroy {

  public result: PaginatedResult = new PaginatedResult();

  private subscription: Subscription;

  private showResult: boolean;

  private pushResult: boolean;

  public tags: Observable<List<Tag>>;

  private _notes: BehaviorSubject<List<Note>> = new BehaviorSubject(List([]));

  /*this.selectedTags = this.source.asObservable();

   let subscriber = this.selectedTagClouds.subscribe(x => {

        console.log('subscribe');
      });    
*/
  private filter: Filter;

  constructor(private noteService: NoteService, private searchService: FilterService
    , private notifier: NotifierService, private snackBar: MdSnackBar, private apiService: ApiService) {
    this.filter = this.searchService.get();
  }

  ngOnInit() {

    this.noteService.search(this.filter)
      .subscribe(
      result => {
        this.pushNotes(result)

      },
      err => {
        console.error(err);
      });

    /*this.noteService.getNotes().subscribe(
      result => {
        this.notes = result.data;
        this._next = result.next;
        this._count = result.count;
        this._nextLink = result.links.next;

      },
      err => {
        console.error(err);
      });*/


    /*this.subscription = this.observable.getObservable().subscribe(event => {
      let eventTag: TagCloud = event.object;
      if (event.id == NEW) {
        this.tags.push(eventTag);
      } else {
        //this.tags.push(event.object);
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].id == eventTag.id) {
            this.tags.splice(i, 1);
          }
        }

      }
    });*/
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  get notes() {
    //return asObservable(this._notes);
    return Observable.of(this._notes) ;
  }


  public notification() {
    console.error('notification');
    this.notifier.notifyError('test');
  }

  public clear() {
    this.result = new PaginatedResult();
  }

  private removeNote(note: Note) {
    for (var i = 0; this.result.data.length > i; i++) {
      if (this.result.data[i].id == note.id) {
        this.result.data.splice(i, 1);
      }
    }
  }

  public showSearch(evt) {
    this.showResult = false;
  }


  public trash(note: Note) {

    this.noteService.trash(note).subscribe(result => {
      this.snackBar.open('Note Send to trash with Succes', 'Ok', { duration: 3000 });
    },
      err => {
        console.error(err);
        this.snackBar.open('Error deleting' + note.title + ' Deleted.', 'Ok');
      }
    );
  }


  public delete(note: Note) {
    this.noteService.deleteNote(note)
      .subscribe(
      result => {
        this.snackBar.open('Note' + note.title + ' Deleted.', 'Ok', { duration: 3000 });
        this.removeNote(note);
      },
      err => {
        console.error(err);
        this.snackBar.open('Error deleting' + note.title + ' Deleted.', 'Ok');
      });

  }


  public next(event) {

    this.noteService.getPaginatedResults(this.result.links.next, this.filter)
      .subscribe(
      result => {
        this.pushNotes(result)
      },
      err => {
        console.error(err);
      });
  }


  private pushNotes(result: PaginatedResult) {
    //test async
    //this._notes.next(List(result.data));
    this.result.links.next = result.links.next;

    for (var i = 0; result.data.length > i; i++) {
          let note:Note = result.data[i];
          this.result.data.push(note);
    }
    
    //this.getTags();
  }

  public getTags() {
    debugger
    let map = new Map();
    for (var i = 0; this.result.data.length > i; i++) {
      let note: Note = this.result.data[i];
      for (let t of note.tags) {
        map.set(t.id, t);
      }
    }

    //for(let v in map.values())
    // this.tags.next(v);


  }
  public isAuthentified(): boolean {
    return true;

  }

  public urlHtml(note: Note) {
    return this.apiService.myNotesEndPoint.archive + note.archive_id + ".html"
  }
  public urlDownload(note: Note) {
    return this.apiService.myNotesEndPoint.archive + note.archive_id + "/download/"
  }
  public archive(evt, note: Note) {
    if (note) {
      this.noteService.archiveNote(note).subscribe(archive => {
        //this.note.description = x.html;
        console.log(archive)
        note.archive_id = archive.id
        this.snackBar.open('Archived with Succes', 'Ok', { duration: 3000 });
      });
    }
  }

}