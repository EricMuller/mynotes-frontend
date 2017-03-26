import { Component, OnInit } from '@angular/core';
import { NoteService } from 'app/modules/note/services/note.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-simple-dnd',
  templateUrl: './simple-dnd.component.html',
  styleUrls: ['./simple-dnd.component.css']
})
export class SimpleDndComponent implements OnInit {

  constructor(private noteService: NoteService,private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    this.noteService.createNote(data).subscribe(x => {
      console.log(x)
      this.snackBar.open('Note created with Succes', 'Ok', { duration: 3000 });
    });;
    //ev.target.appendChild(document.getElementById(data));
  }
}