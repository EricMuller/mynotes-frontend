import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../model/bookmark';
import { BookmarkService } from '../services/bookmark.service';
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bookmark-create',
  templateUrl: './bookmark-create.component.html',
  styleUrls: ['./bookmark-create.component.css']
})
export class BookmarkCreateComponent implements OnInit {

  private note: Bookmark;

  constructor(private noteService: BookmarkService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        let id = params['id'];
        if( id && id > 0) {
          this.noteService.findById(id).subscribe(note => this.note = note);
        }
    });
  }
  
  public keyupHandler(event){
  }

}
