import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Folder } from 'app/modules/folder/model/folder'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { BookmarkService } from 'app/modules/bookmark/services/bookmark.service';

@Component({
  selector: 'app-folder-select-dialog',
  templateUrl: './folder-select-dialog.component.html',
  styleUrls: ['./folder-select-dialog.component.css']
})
export class FolderSelectDialogComponent implements OnInit {

  private selectedFolder: Folder;

  private bookmarkId: number;

  constructor(public dialogRef: MdDialogRef<FolderSelectDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any
    , private notifierService: NotifierService, private bookmarkService: BookmarkService) {
  }

  ngOnInit() {
    this.bookmarkId = this.data['bookmarkId'];
  }

  /**
 * 
 */
  public closeDialog() {
    this.dialogRef.close('cancel');
  }

  /**
   * 
   */
  public addFolderToBookmark() {
    debugger
    if (!this.selectedFolder) {
      this.notifierService.notifyError("A folder should be selected !");
    } else {
      if (this.bookmarkId && this.selectedFolder.id) {
        
        this.bookmarkService.addFolderToBookmark(this.bookmarkId, this.selectedFolder.id).subscribe(
          (response)=>{
            this.notifierService.notifyError("Ok");
            this.dialogRef.close('ok');
          
          }  
        );
        
      }else{
        this.notifierService.notifyError("Please select a folder or a bookmark");
      }
    }

    /* this.folderService.saveFolder(folder).subscribe(tag => {
       this.notifierService.notifyInfo('Folder created with Succes', 3000);
       this.dialogRef.close('ok');
     }, error => {
       let restResponse = RestHelper.getRestResponse(error);
       this.notifierService.notifyError(String(restResponse.exception));
    
     });*/

  }

  public onFolderChange(folder: Folder) {
    this.selectedFolder = folder;
  }


}
