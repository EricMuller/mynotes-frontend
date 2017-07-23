import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'

//https://scotch.io/tutorials/angular-2-http-requests-with-observables
import { Observable } from 'rxjs/Rx';
import { Folder } from '../model/folder';


import { ApiService } from 'app/shared/modules/api/api.service';
import { ResponseService } from 'app/shared/modules/api/response.service'
import { PaginatedResult } from 'app/shared/modules/api/paginated-result'

@Injectable()
export class FolderService {

  constructor(private apiService: ApiService) {   }

 
 public searchByParentId(parentId: number): Observable<PaginatedResult> {
      let filter = '?parent_id='+parentId.toString();
      return  this.apiService.getPaginatedResults(this.apiService.endPoints.folders + filter);
  }

  public searchByLevel(level: number): Observable<PaginatedResult> {
    let filter = '?level='+level.toString();
    return this.apiService.getPaginatedResults(this.apiService.endPoints.folders + filter);
  }


  /*public findById(id: number): Observable<Folder> {
    return this.apiService.getById(this.apiService.endPoints.bookmarks, id.toString());
  }*/

   public searchBookmarksByFolder(folderId: number): Observable<PaginatedResult> {

    return this.apiService.getPaginatedResults(this.apiService.endPoints.folders + "/" + folderId.toString() + "/bookmarks");
   
  }


  public createFolder(folder : Folder): Observable<any> {
    return this.apiService.post(this.apiService.endPoints.folders, folder);
  }

  public deleteFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.deleteById(this.apiService.endPoints.folders, folder.id.toString());
    }
  }
 
  public saveFolder(folder: Folder): Observable<any> {
    if (folder.id > 0) {
      return this.apiService.put(this.apiService.endPoints.folders + folder.id + "/", folder);
    } else {
      return this.apiService.post(this.apiService.endPoints.folders, folder);
    }
  }

}
