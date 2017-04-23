import { Component, OnInit } from '@angular/core';
import { Filter } from '../model/filter';
import { FilterService } from '../services/search.service';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { TYPE_LINK, TYPE_NOTE, TYPE_TODO } from './../model/note';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css']
})
export class NoteFilterComponent implements OnInit {

  public filter: Filter;
  public TYPE_LINK: String = TYPE_LINK;
  public TYPE_NOTE: String = TYPE_NOTE;
  public TYPE_TODO: String = TYPE_TODO;

  constructor(private filterService: FilterService, private snackBar: MdSnackBar, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.filter = this.filterService.get();
  }

  public tagAdded(eventTag) {
    this.filter.tags.push(eventTag);
    this.update();
  }

  public tagRemoved(eventTag) {
    for (var i = 0; this.filter.tags.length > i; i++) {
      if (this.filter.tags[i].id == eventTag.id) {
        this.filter.tags.splice(i, 1);
      }
    }
    this.update();
  }

  private update() {
    this.filterService.update(this.filter);
  }

  public search(){

  }

}

