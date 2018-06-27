import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FolderService} from '../services/folder.service';
import {NotifierService} from '../../../core/notifications/notifier.service';
import {Folder} from '../model/folder';
import {RestHelper} from '../../shared/helpers/rest-helper';
import {FormHelper} from '../../shared/helpers/form-helper';

@Component({
  selector: 'app-folder-create-dialog',
  templateUrl: './folder-create-dialog.component.html',
  styleUrls: ['./folder-create-dialog.component.css']
})
export class FolderCreateDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FolderCreateDialogComponent>,
              private folderService: FolderService,
              private notifierService: NotifierService,
              private _fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this._fb.group({
      name: ['', Validators.required],
      non_field_errors: [''],
    });

  }

  ngOnInit() {
  }

  /**
   *
   */
  public createFolder() {
    const name = this.form.controls['name'].value;
    if (name !== '') {
      let parentId = 0;
      if (this.data) {
        parentId = this.data['parentId'];
      }
      const folder: Folder = Folder.create(name, parentId);
      this.folderService.saveFolder(folder).subscribe(tag => {
        this.notifierService.notifyInfo('Folder created with Succes', 3000);
        this.dialogRef.close('ok');
      }, error => {
        const restResponse = RestHelper.getRestResponse(error);
        if (!FormHelper.updateFormWithRestResponse(restResponse, this.form)) {
          this.notifierService.notifyError(String(restResponse.exception));
        }
      });
    }

  }

  /**
   *
   */
  public closeDialog() {
    this.dialogRef.close('cancel');
  }

}
