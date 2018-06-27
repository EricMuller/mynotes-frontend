import {Injectable} from '@angular/core';
import {Tag} from '../model/tag';
import {TagCount} from '../model/tag-count';
import {HttpService} from '../../../api/http.service';
import {PaginatedResult} from '../../../api/paginated-result';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

// import { SearchNoteResult } from './search-note-result';

@Injectable()
export class TagService {

  public producer = new Subject<TagCount>();

  public selectedTagClouds: Observable<TagCount> = Observable.of(new TagCount(''));

  constructor(private apiService: HttpService) {
  }

  public getSelected(): Observable<TagCount> {
    return this.producer.asObservable();
  }

  public next(tag: TagCount) {
    this.producer.next(tag);
  }

  public getTagsCount(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.endPoints.tagsCount);
  }

  public getUserTags(): Observable<PaginatedResult> {
    return this.apiService.getPaginatedResults(this.apiService.endPoints.tags + '?page_size=500');
  }


  public saveTag(tag: Tag): Observable<any> {
    return this.apiService.post(this.apiService.endPoints.tags, tag);
  }

}
