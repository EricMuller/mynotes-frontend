import { Component } from '@angular/core';

@Component({
  selector: 'bookmark-dash',
  templateUrl: './bookmark-dash.component.html',
  styleUrls: ['./bookmark-dash.component.css']
})
export class BookmarkDashComponent {
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];
}
