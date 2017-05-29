import { Injectable } from '@angular/core';
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tag } from '../model/tag';
import { TagCount } from '../model/tag-count'
//import { SearchNoteResult } from './search-note-result';

import { ApiService } from 'app/shared/modules/api/api.service';

import { PaginatedResult } from 'app/shared/modules/api/paginated-result'
import { Subject } from 'rxjs/Rx';

@Injectable()
export class TagService {

  public  producer = new Subject<TagCount>();

  public  selectedTagClouds: Observable<TagCount> = Observable.of(new TagCount(''));

  constructor(private apiService: ApiService) {
  }
 
 public getSelected(): Observable<TagCount> {
      return this.producer.asObservable();
 }

 public next( tag: TagCount) {
     this.producer.next(tag);
  }

 public getTagsCount(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.endPoints.tagsCount);
 }

 public getUserTags(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.endPoints.tags+"?page_size=500");
 }


 public saveTag(tag: Tag): Observable<any> {
      return this.apiService.post(this.apiService.endPoints.tags, tag);
  }

}
