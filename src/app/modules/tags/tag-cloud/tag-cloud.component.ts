import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';
import { TagCloud } from '../model/tag-cloud'
import { TagAbstractComponent } from '../tag-abstract/tag-abstract.component'
import { ApiService } from 'app/shared/modules/api/api.service';
import { ObservableService } from 'app/shared/modules/observable/observable.service'

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.css']
})
export class TagCloudComponent {

  private selected: false;

  public tags: Array<TagCloud>;
  public nextLink: string;

  constructor(private apiservice: ApiService, private notifier: ObservableService) {
  }

  ngOnInit() {
    this.getTagsCloud();
  }

  public next(event) {
    this.getNextTagsCloud();
  }

  protected getTagsCloud() {
    this.apiservice.getPaginatedResults(this.apiservice.myNotesEndPoint.tagsCloud + "?page_size=500").subscribe(
      result => {
        this.tags = result.data;
        this.nextLink = result.links.next;
        this.updateSize(result.aggregate_data.max_count)
      },
      err => {
        console.error(err);
      });
  }

  protected getNextTagsCloud() {
    if (this.nextLink != null) {
      this.apiservice.getPaginatedResults(this.nextLink).subscribe(
        result => {
          for (let i = 0; i < result.data.length; i++) {
            this.tags.push(result.data[i]);
          }
          this.nextLink = result.links.next;
          this.updateSize(result.aggregate_data.max_count)
        },
        err => {
          console.error(err);
        });
    }
  }

  private updateSize(maxCount: number) {
    if (maxCount > 0) {
      for (let tag of this.tags) {
        tag.size = tag.count * maxCount / 20;
      }
    }
  }

  public selectItem(tag: TagCloud) {
    if ("current" == tag.color) {
      tag.color = "";
      this.notifier.remove(tag);
    } else {
      tag.color = "current";
      this.notifier.add(tag);
    }
  }
}
