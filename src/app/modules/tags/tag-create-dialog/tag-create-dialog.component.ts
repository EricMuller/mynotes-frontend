import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { TagService } from 'app/modules/tags/services/tag.service';
import { Tag } from 'app/modules/tags/model/tag';
@Component({
  selector: 'app-tag-create-dialog',
  templateUrl: './tag-create-dialog.component.html',
  styleUrls: ['./tag-create-dialog.component.css']
})
export class TagCreateDialogComponent implements OnInit {

  public  name: string;

  constructor(public dialogRef: MdDialogRef<TagCreateDialogComponent>, private tagService: TagService, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  public create() {
    if (this.name != "") {

      let tag: Tag = Tag.create(this.name);
      this.tagService.saveTag(tag).subscribe(tag => {
        console.log(tag)
        this.snackBar.open('Tag saved with Succes', 'Ok', { duration: 3000 });
        this.dialogRef.close('ok');
        //this.loadTag();
      });
    }

  }

  public close() {
    this.dialogRef.close('cancel');
  }

}
