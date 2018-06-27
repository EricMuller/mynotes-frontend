import {Injectable} from '@angular/core';


import {Folder} from '../model/folder';
import {HttpService} from '../../../api/http.service';
import {Observable} from 'rxjs/Observable';
import {PaginatedResult} from '../../../api/paginated-result';


@Injectable()
export class FolderService {

  constructor(private apiService: HttpService) {
  }


  public searchByParentId(parentId: number): Observable<PaginatedResult> {
    const filter = '?parent_id=' + parentId.toString();
    return this.apiService.getPaginatedResults(this.apiService.endPoints.folders + filter);
  }

  public searchByLevel(level: number): Observable<PaginatedResult> {
    const filter = '?level=' + level.toString();
    return this.apiService.getPaginatedResults(this.apiService.endPoints.folders + filter);
  }

  /*public findById(id: number): Observable<Folder> {
    return this.apiService.getById(this.apiService.endPoints.bookmarks, id.toString());
  }*/

  public searchBookmarksByFolder(folderId: number): Observable<PaginatedResult> {

    return this.apiService.getPaginatedResults(this.apiService.endPoints.folders + folderId.toString() + '/bookmarks/');

  }


  public createFolder(folder: Folder): Observable<any> {
    return this.apiService.post(this.apiService.endPoints.folders, folder);
  }

  public deleteFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.deleteById(this.apiService.endPoints.folders, folder.id.toString());
    }
  }

  public saveFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.put(this.apiService.endPoints.folders + folder.id + '/', folder);
    } else {
      return this.apiService.post(this.apiService.endPoints.folders, folder);
    }
  }

}
