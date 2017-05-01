import { Component, OnInit } from '@angular/core';
import { Filter } from '../model/filter';
import { FilterService } from '../services/search.service';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { KIND_LINK, KIND_NOTE, KIND_TODO } from './../model/webmark';

@Component({
  selector: 'app-webmark-search',
  templateUrl: './webmark-search.component.html',
  styleUrls: ['./webmark-search.component.css']
})
export class WebmarkFilterComponent implements OnInit {

  public filter: Filter;
  public KIND_LINK: String = KIND_LINK;
  public KIND_NOTE: String = KIND_NOTE;
  public KIND_TODO: String = KIND_TODO;

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

