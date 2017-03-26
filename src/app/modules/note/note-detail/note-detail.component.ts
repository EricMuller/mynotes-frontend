import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Note } from '../model/note';
import { NoteService } from '../services/note.service';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { TagCloud } from 'app/modules/tags/model/tag-cloud';
import { Tag } from 'app/modules/tags/model/tag';
import { Location }                 from '@angular/common';
import { FilterService } from '../services/search.service';
import { MdSnackBar } from '@angular/material';
import { Filter } from '../model/filter';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service'

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  private note: Note = new Note();

  private showEditor:boolean =false;

  constructor( private router: Router,private location: Location,private noteService: NoteService, private route: ActivatedRoute
  , private notifier: NotifierService, private snackBar: MdSnackBar,private filterService: FilterService,
  private authgardService :AuthgardService) {

  }


  isAuthentified(): boolean {
    return this.authgardService.isAuthentified();
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id && id != 0) {
        this.noteService.findById(id).subscribe(
          note => {
            this.note = note;
          }

        );
      } else {
        this.note = new Note();
        this.note.type ='BOOKMARK';
      }
    });

  }

  public keyupHandler(event) {

  }

  public pageView(note: Note) {

  }

  public save(note: Note) {
    this.noteService.saveNote(note).subscribe(x => {
      this.snackBar.open('Note saved with Succes', 'Ok', { duration: 3000 });
      this.back();
    });
  }


  public  back(){
      this.location.back();
  }
  /*public filter(name: string): Tag[] {
    let res: Tag[] = this.tags.filter(tag => new RegExp(name, 'gi').test(tag.name));
    if (res.length == 1) {
      /*function contains(arr, x) {
        return arr.filter(function(elem) { return elem == x }).length > 0;
      }*/
     /* let tagCloud = res[0];
      if (!(this.note.tags.filter(t => t.id == tagCloud.id).length > 0)) {
        console.log(res);
        let tag: Tag = new Tag();
        tag.id = tagCloud.id;
        tag.name = tagCloud.name;
        tag.public = false;
        this.note.tags.push(tag);
      }
    }
    return res;
  }*/

  selectedIndexChange(evt){

    if(evt == 1 ){
      this.showEditor=true;
    }else{
      this.showEditor=false;
    }
    
  }

  public onRate(value) {
    this.note.rate = value;
  }

  public delete(tag: Tag) {
    this.note.tags = this.note.tags.filter(t => t.id != tag.id).slice();
  }

 

  public loadTitle(url) {
    this.noteService.loadTitle(url).subscribe(data => {
      this.note.title = data.title;
    });
  }

  public tagAdded(eventTag) {
    this.note.tags.push(eventTag);
  }

  public tagRemoved(eventTag) {
    for (var i = 0; this.note.tags.length > i; i++) {
      if (this.note.tags[i].id == eventTag.id) {
        this.note.tags.splice(i, 1);
      }
    }
  }

}
