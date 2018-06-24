import {ApplicationRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from 'app/shared/modules/api/api.service';
import {TagCount} from '../model/tag-count'
import {Letter} from '../model/letter'


import {TagCreateDialogComponent} from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tag-select-card',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent implements OnInit, OnChanges {

  @Input('tagSelected')
  private tagSelected: Array<any>;
  @Output('tagAdded')
  private addTag = new EventEmitter<TagCount>();
  @Output('tagRemoved')
  private removeTag = new EventEmitter<TagCount>();

  @Input('readonly')
  public readonly: Boolean;

  @Input('disabled')
  public disabled: Boolean = false;

  public tags: Array<TagCount>;
  public nextLink: string;
  public letters: Array<Letter> = [];

  constructor(private apiService: ApiService, public dialog: MatDialog, private applicationRef: ApplicationRef) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getTags();
  }

  update(val) {
    console.log('toto');
  }

  protected getTags() {

    this.apiService.getPaginatedResults(this.apiService.endPoints.tagsCount + '?page_size=500').subscribe(
      result => {
        this.tags = result.data;
        this.nextLink = result.links.next;
        this.buildLetters();
        this.selectTag();
      },
      err => {
        console.error(err);
      });

  }

  private buildLetters() {
    const letters: Array<string> = [];
    this.letters = [];
    for (let j = 0; this.tags.length > j; j++) {
      letters.push(this.tags[j].name.substring(0, 1).toUpperCase());
      this.tags[j].show = false;
      this.tags[j].selected = false;
    }

    for (var l of Array.from(new Set(letters))) {
      const letter = new Letter(l);
      this.letters.push(letter);
    }

  }

  private selectTag() {
    for (var i = 0; this.tagSelected.length > i; i++) {
      for (var j = 0; this.tags.length > j; j++) {
        if (this.tags[j].id == this.tagSelected[i].id) {
          this.tags[j].selected = true;
          break;
        }
      }
    }
  }

  /**
   *
   * @param tag filter
   */
  public filterSelected(tag: TagCount) {
    return tag.selected == true;
  }

  public filterNotSelected(tag: TagCount) {
    return tag.selected == false;
  }

  /**
   * filter by  letter
   * @param l
   */
  public selectLetter(l: Letter) {

    for (var j = 0; this.tags.length > j; j++) {
      if (this.tags[j].name.substring(0, 1).toUpperCase() == l.name) {
        this.tags[j].show = true;

      } else {
        this.tags[j].show = false;
      }
      //this.tags[j].color = this.tagColor(this.tags[j]);

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

  /*public isSelected(tag: TagCount): boolean {
    return "current" == tag.color;
  }*/

  /*public setSelected(tag: TagCount) {
    tag.color = "current";
  }*/

  public tagColor(tag) {

    if (tag.show == true) {
      if (tag.selected == true) {
        return 'accent';
      } else {
        return 'primary';
      }
    } else {
      if (tag.selected == true) {
        return 'accent';
      } else {
        return 'current';
      }
    }

  }

  public selectItem(tag: TagCount) {

    if (!this.disabled) {
      if (tag.selected) {
        //tag.color = "";
        tag.selected = false;
        this.removeTag.next(tag);
        this.tagRemoved(tag);
      } else {
        //this.setSelected(tag);
        //tag.color = "current";
        tag.selected = true;
        this.addTag.next(tag);
        this.tagAdded(tag);
      }

      //tag.color = this.tagColor(tag);

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
      }
      ;
    });
  }

}
