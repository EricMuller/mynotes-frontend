import {Component, OnInit} from '@angular/core';

import {TagCount} from '../model/tag-count';
import {ObservableService} from '../../../core/observable/observable.service';
import {HttpService} from '../../../api/http.service';


@Component({
  selector: 'app-tag-count',
  templateUrl: './tag-count.component.html',
  styleUrls: ['./tag-count.component.css']
})
export class TagCountComponent implements OnInit {

  private selected: false;

  public tags: Array<TagCount>;
  public nextLink: string;

  constructor(private httpService: HttpService, private notifier: ObservableService) {
  }

  public ngOnInit() {
    this.getTagsCount();
  }

  public next(event) {
    this.getNextTagsCount();
  }

  protected getTagsCount() {
    this.httpService.getPaginatedResults(this.httpService.endPoints.tagsCount + '?page_size=500').subscribe(
      result => {
        this.tags = result.data;
        this.nextLink = result.links.next;
        this.updateSize(result.aggregate_data.max_count);
      },
      err => {
        console.error(err);
      });
  }

  protected getNextTagsCount() {
    if (this.nextLink != null) {
      this.httpService.getPaginatedResults(this.nextLink).subscribe(
        result => {
          for (let i = 0; i < result.data.length; i++) {
            this.tags.push(result.data[i]);
          }
          this.nextLink = result.links.next;
          this.updateSize(result.aggregate_data.max_count);
        },
        err => {
          console.error(err);
        });
    }
  }

  private updateSize(maxCount: number) {
    if (maxCount > 0) {
      for (const tag of this.tags) {
        tag.size = tag.count * maxCount / 20;
      }
    }
  }

  public selectItem(tag: TagCount) {
    if ('current' === tag.color) {
      tag.color = '';
      this.notifier.remove(tag);
    } else {
      tag.color = 'current';
      this.notifier.add(tag);
    }
  }
}
