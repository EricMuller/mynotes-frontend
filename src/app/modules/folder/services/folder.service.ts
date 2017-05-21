import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'

//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';
import { Folder } from '../model/folder';


import { ApiService } from 'app/shared/modules/api/api.service';
import { ResponseService } from 'app/shared/services/response.service'
import { PaginatedResult } from 'app/shared/services/paginated-result'

@Injectable()
export class FolderService {

  constructor(private apiService: ApiService) {   }

 
 public searchByParentId(parentId: number): Observable<PaginatedResult> {
      let filter = '?parent_id='+parentId.toString();
      return  this.apiService.getPaginatedResults(this.apiService.myWebmarksEndPoint.folders + filter);
  }

  public searchByLevel(level: number): Observable<PaginatedResult> {
    let filter = '?level='+level.toString();
    return this.apiService.getPaginatedResults(this.apiService.myWebmarksEndPoint.folders + filter);
  }


  public findById(id: number): Observable<Folder> {
    return this.apiService.getById(this.apiService.myWebmarksEndPoint.bookmarks, id.toString());
  }

  public createFolder(folder : Folder): Observable<any> {
    return this.apiService.post(this.apiService.myWebmarksEndPoint.folders, folder);
  }

  public deleteFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.deleteById(this.apiService.myWebmarksEndPoint.folders, folder.id.toString());
    }
  }
 
  public saveFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.put(this.apiService.myWebmarksEndPoint.folders + folder.id + "/", folder);
    } else {
      return this.apiService.post(this.apiService.myWebmarksEndPoint.folders, folder);
    }
  }

}
