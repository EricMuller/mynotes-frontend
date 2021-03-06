import {Component, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material';
import {BookmarkService} from '../../../features/bookmark/services/bookmark.service';

@Component({
  selector: 'app-simple-dnd',
  templateUrl: './simple-dnd.component.html',
  styleUrls: ['./simple-dnd.component.css']
})
export class SimpleDndComponent implements OnInit {

  constructor(private noteService: BookmarkService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    console.log(data);
    this.noteService.createBookmark(data).subscribe(x => {
      console.log(x);
      this.snackBar.open('Note created with Succes', 'Ok', {duration: 3000});
    });
    // ev.target.appendChild(document.getElementById(data));
  }
}
