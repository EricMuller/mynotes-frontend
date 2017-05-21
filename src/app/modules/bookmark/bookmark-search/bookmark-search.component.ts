import { Component, OnInit } from '@angular/core';
import { Filter } from '../model/filter';
import { FilterService } from '../services/search.service';
import { MdDialog } from '@angular/material';
import { KIND_LINK, KIND_NOTE, KIND_TODO } from './../model/bookmark';
import { BookmarkService } from '../services/bookmark.service';

@Component({
  selector: 'app-bookmark-search',
  templateUrl: './bookmark-search.component.html',
  styleUrls: ['./bookmark-search.component.css']
})
export class BookmarkFilterComponent implements OnInit {

  public filter: Filter;
  public KIND_LINK: String = KIND_LINK;
  public KIND_NOTE: String = KIND_NOTE;
  public KIND_TODO: String = KIND_TODO;

  constructor(private filterService: FilterService, public dialog: MdDialog) { }

  ngOnInit() {
    this.filter = this.filterService.get();
  }
  /**
   * Tag is added in the tag-select component
   * @param eventTag 
   */
  public tagAdded(eventTag) {
    this.filter.tags.push(eventTag);
    this.update();
  }
  /**
   * Tag is removed in the tag-select component
   * @param eventTag 
   */
  public tagRemoved(eventTag) {
    for (var i = 0; this.filter.tags.length > i; i++) {
      if (this.filter.tags[i].id == eventTag.id) {
        this.filter.tags.splice(i, 1);
      }
    }
    this.update();
  }

  /**
   * Update current filter 
   */
  private update() {
    this.filterService.update(this.filter);
  }

}

