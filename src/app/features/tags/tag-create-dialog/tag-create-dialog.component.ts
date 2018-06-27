import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {TagService} from '../services/tag.service';
import {Tag} from '../model/tag';
import {NotifierService} from '../../../core/notifications/notifier.service';
import {RestHelper} from '../../shared/helpers/rest-helper';
import {FormHelper} from '../../shared/helpers/form-helper';

@Component({
  selector: 'app-tag-create-dialog',
  templateUrl: './tag-create-dialog.component.html',
  styleUrls: ['./tag-create-dialog.component.css']
})
export class TagCreateDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TagCreateDialogComponent>, private tagService: TagService,
              private notifierService: NotifierService, private _fb: FormBuilder) {

    this.form = this._fb.group({
      name: ['', Validators.required],
      non_field_errors: [''],
    });

  }

  ngOnInit() {
  }

  public create() {
    const name = this.form.controls['name'].value;
    if (name !== '') {
      const tag: Tag = Tag.create(name);
      this.tagService.saveTag(tag).subscribe(newtag => {
        this.notifierService.notifyInfo('Tag saved with Succes', 3000);
        this.dialogRef.close('ok');
      }, error => {
        const restResponse = RestHelper.getRestResponse(error);
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
