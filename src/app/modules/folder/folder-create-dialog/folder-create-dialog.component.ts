import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FolderService } from 'app/modules/folder/services/folder.service';
import { Folder } from 'app/modules/folder/model/folder';
import { RestHelper } from 'app/modules/helpers/RestHelper';
import { FormHelper } from 'app/modules/helpers/FormHelper';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-folder-create-dialog',
  templateUrl: './folder-create-dialog.component.html',
  styleUrls: ['./folder-create-dialog.component.css']
})
export class FolderCreateDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MdDialogRef<FolderCreateDialogComponent>,
    private folderService: FolderService, private notifierService: NotifierService,
    private _fb: FormBuilder, @Inject(MD_DIALOG_DATA) public data: any) {

    this.form = this._fb.group({
      name: ['', Validators.required],
      non_field_errors: [''],
    });

  }

  ngOnInit() {
  }

  public create() {
    let name = this.form.controls['name'].value
    if (name != "") {
      let parentId = 0;
      debugger
      if (this.data){
          parentId =this.data['parentId'];
      }
      let folder: Folder = Folder.create(name, parentId);
      this.folderService.saveFolder(folder).subscribe(tag => {
        this.notifierService.notifyInfo('Folder created with Succes', 3000);
        this.dialogRef.close('ok');
      }, error => {
        let restResponse = RestHelper.extractErrors(error);
        if (!FormHelper.updateValidationMessageToForm(restResponse, this.form)) {
          this.notifierService.notifyError(String(restResponse.exception));
        }
      });
    }

  }

  public close() {
    this.dialogRef.close('cancel');
  }

}
