import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bookmark } from '../model/bookmark';
import { BookmarkService } from '../services/bookmark.service';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { TagCount } from 'app/modules/tags/model/tag-count';
import { Tag } from 'app/modules/tags/model/tag';
import { Location } from '@angular/common';
import { FilterService } from '../services/search.service';
import { MdSnackBar } from '@angular/material';
import { Filter } from '../model/filter';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'
import { KIND_LINK, KIND_NOTE, KIND_TODO } from '../model/bookmark';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookmark-detail',
  templateUrl: './bookmark-detail.component.html',
  styleUrls: ['./bookmark-detail.component.css']
})
export class WebmarkDetailComponent implements OnInit {

  @Input() w: Bookmark;

  public bookmark: Bookmark = new Bookmark();

  public KINDS = [{ 'kind': KIND_LINK, 'icon': 'link' }
    , { 'kind': KIND_NOTE, 'icon': 'note' }
    , { 'kind': KIND_TODO, 'icon': 'schedule' }];


  public showEditor: boolean = false;

  constructor(private router: Router, private location: Location, private bookmarkService: BookmarkService, private route: ActivatedRoute
    , private notifier: NotifierService, private snackBar: MdSnackBar, private filterService: FilterService,
    private authgardService: AuthgardService) {

  }

/**
 * Call bookmarkService load bookmark if id > 0
 */
  ngOnInit() {

    this.bookmark = new Bookmark();
    this.bookmark.kind = KIND_LINK;

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id && id != 0) {
        this.bookmarkService.findById(id).subscribe(
          webmark => {
            console.log('ngOnInit');
            this.bookmark = webmark;
          }
        );
      }
    });

  }

 

/**
 * Call bookmarkService Save bookmark in db
 * @param bookmark 
 */
  public save(bookmark: Bookmark) {
     this.bookmarkService.saveBookmark(bookmark).subscribe(x => {
      this.snackBar.open('Bookmark saved with Succes', 'Ok', { duration: 3000 });
     // this.back();
    });
  }


/**
 * Call bookmarkService load title of web page
 * @param url 
 */
  public loadTitle(url) {
    this.bookmarkService.loadTitle(url).subscribe(data => {
      this.bookmark.title = data.title;
    });
  }

 public keyupHandler(event) {
  }

  public pageView(bookmark: Bookmark) {
  }


  public back() {
    this.location.back();
  }
 
  selectedIndexChange(evt) {
    if (evt == 1) {
      this.showEditor = true;
    } else {
      this.showEditor = false;
    }
  }

  public onRate(value) {
    this.bookmark.rate = value;
  }

  public delete(tag: Tag) {
    this.bookmark.tags = this.bookmark.tags.filter(t => t.id != tag.id).slice();
  }


  public tagAdded(eventTag) {
    this.bookmark.tags.push(eventTag);
  }

  public tagRemoved(eventTag) {
    for (var i = 0; this.bookmark.tags.length > i; i++) {
      if (this.bookmark.tags[i].id == eventTag.id) {
        this.bookmark.tags.splice(i, 1);
      }
    }
  }

  public keyupHandlerFunction(event) {
    this.bookmark.description = event;
  }

  public isAuthentified(): boolean {
    return this.authgardService.isAuthentified();
  }

 /*public filter(name: string): Tag[] {
    let res: Tag[] = this.tags.filter(tag => new RegExp(name, 'gi').test(tag.name));
    if (res.length == 1) {
      /*function contains(arr, x) {
        return arr.filter(function(elem) { return elem == x }).length > 0;
      }*/
  /* let tagCloud = res[0];
   if (!(this.webmark.tags.filter(t => t.id == tagCloud.id).length > 0)) {
     console.log(res);
     let tag: Tag = new Tag();
     tag.id = tagCloud.id;
     tag.name = tagCloud.name;
     tag.public = false;
     this.webmark.tags.push(tag);
   }
 }
 return res;
}*/
}
