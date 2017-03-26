import { Injectable } from '@angular/core';
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tag } from '../model/tag';
import { TagCloud } from '../model/tag-cloud'
//import { SearchNoteResult } from './search-note-result';

import { ApiService } from 'app/shared/modules/api/api.service';
import { ResponseService } from 'app/shared/services/response.service'


import { PaginatedResult } from 'app/shared/services/paginated-result'
import { Subject } from 'rxjs/Rx';

@Injectable()
export class TagService {

  public  producer = new Subject<TagCloud>();

  public  selectedTagClouds: Observable<TagCloud> = Observable.of(new TagCloud(''));

  constructor(private apiService: ApiService) {
  }
 
 public getSelected(): Observable<TagCloud> {
      return this.producer.asObservable();
 }

 public next( tag: TagCloud) {
     this.producer.next(tag);
  }

 public getTagsCloud(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.config.tagsCloud);
 }

 public getUserTags(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.config.tags+"?page_size=500");
 }


 public saveTag(tag: Tag): Observable<any> {
      return this.apiService.post(this.apiService.config.tags, tag);
  }

}
