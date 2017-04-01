import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms'
import { TagAbstractComponent } from '../tag-abstract/tag-abstract.component'
import { ApiService } from 'app/shared/modules/api/api.service';
import { TagService } from 'app/modules/tags/services/tag.service'
import { ObservableService } from 'app/shared/modules/observable/observable.service'
import { Observable } from 'rxjs/Rx';
import { TagCloud } from '../model/tag-cloud'
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { TagCreateDialogComponent } from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';

@Component({
  selector: 'app-tag-select-card',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent implements OnInit, OnChanges {

  @Input('tagSelected')
  private tagSelected: Array<any>;
  @Output('tagAdded')
  private addTag = new EventEmitter<TagCloud>();
  @Output('tagRemoved')
  private removeTag = new EventEmitter<TagCloud>();

  public tags: Array<TagCloud>;
  public nextLink: string;

  constructor(private apiService: ApiService, private snackBar: MdSnackBar, public dialog: MdDialog) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getTags();
  }

  ngAfterViewInit() {

  }

  update(val) {
    console.log('toto');
  }

  protected getTags() {
    console.log(this.tagSelected);

    this.apiService.getPaginatedResults(this.apiService.config.tagsCloud + "?page_size=500").subscribe(
      result => {
        this.tags = result.data;
        this.nextLink = result.links.next;
        //this.updateSize(result.aggregate_data.max_count)
        //this.selectTag();
        this.selectTag();
      },
      err => {
        console.error(err);
      });

  }

  private selectTag() {
    for (var i = 0; this.tagSelected.length > i; i++) {
      for (var j = 0; this.tags.length > j; j++) {
        if (this.tags[j].id == this.tagSelected[i].id) {
          this.tags[j].color = "current";
          break;
        }
      }
    }
  }

  public next(event) {
    //  this.getNextTagsCloud();
  }

  public selectItem(tag: TagCloud) {
    if ("current" == tag.color) {
      tag.color = "";
      this.removeTag.next(tag);
      this.tagRemoved(tag);
    } else {
      tag.color = "current";
      this.addTag.next(tag);
      this.tagAdded(tag);
    }
  }

  public tagAdded(eventTag) {
    this.tagSelected.push(eventTag);

  }

  public tagRemoved(eventTag) {
    for (var i = 0; this.tagSelected.length > i; i++) {
      if (this.tagSelected[i].id == eventTag.id) {
        this.tagSelected.splice(i, 1);
      }
    }
  }

  public openTagCreateDialog() {
    let dialogRef = this.dialog.open(TagCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result = 'ok') {
        this.getTags();
      };
    });
  }

}
