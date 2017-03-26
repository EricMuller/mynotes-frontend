import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { NoteService } from '../services/note.service';
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  private note: Note;

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

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
