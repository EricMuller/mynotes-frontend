import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms'
import { TagAbstractComponent } from '../tag-abstract/tag-abstract.component'
import { ApiService } from 'app/shared/modules/api/api.service';
import { TagService } from 'app/modules/tags/services/tag.service'
import { ObservableService } from 'app/shared/modules/observable/observable.service'
import { Observable } from 'rxjs/Rx';
import { TagCloud } from '../model/tag-cloud'
import { Letter } from '../model/letter'
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

  public letters: Array<Letter> = [];

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

    this.apiService.getPaginatedResults(this.apiService.myNotesEndPoint.tagsCloud + "?page_size=500").subscribe(
      result => {
        this.tags = result.data;
        this.nextLink = result.links.next;
        //this.updateSize(result.aggregate_data.max_count)
        //this.selectTag();
        this.selectTag();
        this.buildLetters();
      },
      err => {
        console.error(err);
      });

  }
  private buildLetters() {
    let letters: Array<string> = [];
    this.letters =[];
    for (var j = 0; this.tags.length > j; j++) {
      letters.push(this.tags[j].name.substring(0, 1).toUpperCase());
      this.tags[j].show = true;
    }

    for(var l of Array.from(new Set(letters))){
      let letter = new Letter(l);
      this.letters.push(letter) ;
    }

    

    console.log(this.letters);
  }

  private selectTag() {
    for (var i = 0; this.tagSelected.length > i; i++) {
      for (var j = 0; this.tags.length > j; j++) {
        if (this.tags[j].id == this.tagSelected[i].id) {
          //this.tags[j].color = "current";
          this.setSelected(this.tags[j]);
          break;
        }
      }

    }
  }


  public selectLetter(l: Letter) {
    for (var j = 0; this.tags.length > j; j++) {
      if (this.tags[j].name.substring(0, 1).toUpperCase() == l.name) {
        this.tags[j].show = true;
      } else {
        this.tags[j].show = false;
      }
    }

    for (var j = 0; this.letters.length > j; j++) {
      if (this.letters[j].name == l.name) {
        this.letters[j].selected = true;
      } else {
        this.letters[j].selected = false;
      }
    }
  }
  public next(event) {
    //  this.getNextTagsCloud();
  }

  public isSelected(tag: TagCloud): boolean {
    return "current" == tag.color;
  }
  public setSelected(tag: TagCloud) {
    tag.color = "current";
  }

  public selectItem(tag: TagCloud) {
    if (this.isSelected(tag)) {
      tag.color = "";
      this.removeTag.next(tag);
      this.tagRemoved(tag);
    } else {
      this.setSelected(tag);
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
