import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { TagService } from 'app/modules/tags/services/tag.service';
import { Tag } from 'app/modules/tags/model/tag';
import { RestHelper } from 'app/modules/helpers/rest-helper';
import { FormHelper } from 'app/modules/helpers/form-helper';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-create-dialog',
  templateUrl: './tag-create-dialog.component.html',
  styleUrls: ['./tag-create-dialog.component.css']
})
export class TagCreateDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MdDialogRef<TagCreateDialogComponent>, private tagService: TagService, 
                private notifierService: NotifierService,private _fb: FormBuilder) { 

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
      let tag: Tag = Tag.create(name);
      this.tagService.saveTag(tag).subscribe(tag => {
        this.notifierService.notifyInfo('Tag saved with Succes',3000);
        this.dialogRef.close('ok');
        //this.loadTag();
      },error => {
        debugger
        let restResponse = RestHelper.getRestResponse(error);
        if (!FormHelper.updateFormWithRestResponse(restResponse, this.form)) {
            this.notifierService.notifyError(String(restResponse.exception));
        }
      });
    }

  }

  public close() {
    this.dialogRef.close('cancel');
  }

}
