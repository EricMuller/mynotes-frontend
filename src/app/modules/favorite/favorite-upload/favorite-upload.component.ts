import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/modules/api/api.service';
import { Observable } from 'rxjs/Rx';
import { TagService } from 'app/modules/tags/services/tag.service'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
//import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { CustomHttp } from 'app/shared/modules/http/custom.http';

@Component({
  selector: 'app-favorite-upload',
  templateUrl: './favorite-upload.component.html',
  styleUrls: ['./favorite-upload.component.css']
})
export class FavoriteUploadComponent implements OnInit {

  // private  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3001/upload' });

  constructor(protected apiservice: ApiService, private notifier: NotifierService, private http :CustomHttp) {
    
  }

  ngOnInit() {
    
/*    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    this.uploader = new FileUploader({ url: this.apiservice.config.upload ,authToken: 'Token ' +currentUser.token});
    
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log("onSuccessItem " + status, item);
       this.notifier.notifySuccess(item.file.name);
    }
    this.uploader.onErrorItem = this.onErrorItem;
  */
}

/*  public  onSuccessItem (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders)  {
        console.log("onSuccessItem " + status, item);
        this.notifier.notifyInfo(item._file.name);

  }*/
 
 /* public  onErrorItem  (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders)  {
      console.error("onErrorItem " + status, item);
      this.notifier.notifyError(item._file.name);
  }*/

  /*public onChange(event) {
    let file = event.srcElement.files;
    let postData = { field1: "field1", field2: "field2" }; // Put your form data variable. This is only example.

    this.apiservice.postWithFile(this.apiservice.config.upload, postData, file);
    /*.then(result => {
        console.log(result);
    });*/
  //}*/

  /*public onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];

        let fileArray = Array.from(files);

        console.log(fileArray);

        //fields = ('file', 'name', 'version', 'upload_date', 'size')

        //let postData = { file: "field1", name: this.file.name,upload_date : this.file.lastModifiedDate,size: this.file.size };
         let postData = {};

         this.apiservice.postWithFile(this.apiservice.config.upload, postData, fileArray);
    }

     public fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

     public  upload() {

       this.apiservice.postWithFile(this.apiservice.config.upload, [], this.filesToUpload);
       
    }
 
 */
}
