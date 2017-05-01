

import { Injectable, Inject } from '@angular/core';
import { MyWebmarkEndPoint } from 'app/config/app.api.config';
import { Http, Response, Headers } from '@angular/http';
import { CustomHttp } from 'app/shared/modules/http/custom.http'
import { Observable } from 'rxjs/Rx';
import { PaginatedResult } from 'app/shared/services/paginated-result'
import { ResponseService } from 'app/shared/services/response.service'





/*
@Injectable()
export class ApiNamingService {

    constructor( @Inject('api.config') public apiConfig: ApiConfig) {
        //this.API_ENDPOINT = 'api/v1/';
        //this.CONSUMER_KEY = 'someReallyStupidTextWhichWeHumansCantRead'
        console.log("Injected config:", this.apiConfig);
    }

    public url(url: string): string {
        return this.apiConfig.apiUrl + url;
    }

    public create(url: string, page: number, pageSize?: number): string {

        let strPageSize: string = String(this.apiConfig.pageSize);

        if (pageSize) {
            strPageSize = String(pageSize);
        }

        return this.apiConfig.apiUrl + url + "?page=" + String(page) + "&page_size=" + strPageSize;
    }


    /*public getNotesListEnpoint(): string {
        // dont forget backslash
        return this.apiConfig.apiUrl + "notes/";
    }

    public getTagsListEnpoint(): string {
        // dont forget backslash
        return this.apiConfig.apiUrl + "tags/";
    }

    public getTagsCloudListEnpoint(): string {
        // dont forget backslash
        return this.apiConfig.apiUrl + "tags-cloud/";
    }*/

/*
}
*/

@Injectable()
export class ApiService {


    constructor(private http: CustomHttp, 
                private response: ResponseService,
                @Inject('mynotes.endpoint') public myNotesEndPoint: MyWebmarkEndPoint) {
        console.log('NoteService constructor');
    }

    public getByIdWithParams(url: string,id: string,params:string,timeout?: number): Observable<any> {
        return this.http.get(url+id+"/"+params,timeout)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }
    public getById(url: string,id: string, timeout?: number): Observable<any> {
        return this.http.get(url+id+"/",timeout)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public deleteById(url: string,id: string, timeout?: number): Observable<any> {
        return this.http.delete(url+id+"/",timeout)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public get(url: string): Observable<any> {
        return this.http.get(url)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }


    public getPaginatedResults(url: string): Observable<PaginatedResult> {
        return this.http.get(url)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public getPage(url: string,page: number): Observable<PaginatedResult> {
        return this.http.get(url)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    /*  .map(this.response.extractBody)
      .catch(this.response.handleError).share();
            return this.http.get(this.apiURL)
               // ...and calling .json() on the response to return data
                .map((res:Response) => res.json())
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
    
    public post (url: string, jsonData: any): Observable<any> {
        return this.http.post(url, jsonData).map(this.response.extractBody)
          .catch(this.response.handleError).share();
    }

    public put(url: string, jsonData: any): Observable<any> {
        return this.http.put(url, jsonData).map(this.response.extractBody)
          .catch(this.response.handleError).share();
    }

    public postWithFile (url: string, postData: any, files: File[]): Observable<any> {

        let headers = new Headers();
        let formData:FormData = new FormData();
        //formData.append('files', files[0], files[0].name);
        // For multiple files
         for (let i = 0; i < files.length; i++) {
             formData.append(`files[]`, files[i], files[i].name);
         }

        if(postData !=="" && postData !== undefined && postData !==null) {
            for (var property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }
        console.log("postWithFile :formData="+formData)
        return this.http.post(url, formData, {
            headers: headers
        }).map(this.response.extractBody)
          .catch(this.response.handleError).share();
        /*var returnReponse = new Promise((resolve, reject) => {
        this.http.post(url, formData, {
            headers: headers
        }).subscribe(
            res => {
                this.responseData = res.json();
                resolve(this.responseData);
            },
            error => {
                this.router.navigate(['/login']);
                reject(error);
            }
        );
        });
        return returnReponse;*/

        
     }
}