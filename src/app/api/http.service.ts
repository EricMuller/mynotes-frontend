

import { Injectable, Inject } from '@angular/core';

import { Headers } from '@angular/http';

import {CustomHttp} from '../core/http/custom.http';
import {ResponseService} from './response.service';
import {PaginatedResult} from './paginated-result';
import {Observable} from 'rxjs/Observable';
import {WebmarksEndPoint} from './webmarks/api-webmarks.config';



@Injectable()
export class HttpService {

    constructor(private http: CustomHttp,
        private response: ResponseService,
        @Inject('mywebmark.endpoint') public endPoints: WebmarksEndPoint) {
        console.log('NoteService constructor');
    }

    public getByIdWithParams(url: string, id: string, params: string, timeout?: number): Observable<any> {
        return this.http.customGet(url + id + '/' + params, timeout)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public getById(url: string, id: string, timeout?: number): Observable<any> {
        return this.http.customGet(url + id + '/', timeout)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public deleteById(url: string, id: string, timeout?: number): Observable<any> {

        return this.http.customeDelete(url + '/' + id)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public get(url: string): Observable<any> {
        return this.http.customGet(url)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }


    public getPaginatedResults(url: string): Observable<PaginatedResult> {
        return this.http.customGet(url)
            .map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public getPage(url: string, page: number): Observable<PaginatedResult> {
        return this.http.customGet(url)
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

    public post(url: string, jsonData: any): Observable<any> {
        return this.http.post(url, jsonData).map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public put(url: string, jsonData: any): Observable<any> {
        return this.http.put(url, jsonData).map(this.response.extractBody)
            .catch(this.response.handleError).share();
    }

    public postWithFile(url: string, postData: any, files: File[]): Observable<any> {

        const headers = new Headers();
        const formData = new FormData();
        // formData.append('files', files[0], files[0].name);
        // For multiple files
        for (let i = 0; i < files.length; i++) {
            formData.append(`files[]`, files[i], files[i].name);
        }

        if (postData !== '' && postData !== undefined && postData !== null) {
            for (const property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }
        console.log('postWithFile :formData=' + formData);
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
