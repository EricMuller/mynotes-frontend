import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-backup-bookmark',
  templateUrl: './backup-bookmark.component.html',
  styleUrls: ['./backup-bookmark.component.css']
})
export class BackupBookmarkComponent implements OnInit {

  @Input('url')
  public url: string;

  constructor() { }
  ngOnInit() {
  }

}
