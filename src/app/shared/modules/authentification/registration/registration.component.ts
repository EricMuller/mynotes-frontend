import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { Registration } from 'app/shared/modules/authentification/model/registration.model'
import { Router, ActivatedRoute } from '@angular/router';
import { RestHelper } from 'app/modules/helpers/rest-helper';
import { FormHelper } from 'app/modules/helpers/form-helper';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RestHelper]
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;

  constructor(private authentificationService: AuthentificationService,
    private notifierService: NotifierService,
    private router: Router,
    private _fb: FormBuilder) {

    this.form = this._fb.group({
      email: ['e.mul@free.fr', Validators.required],
      username: ['webdev', Validators.required],
      password1: ['webdev', Validators.required],
      password2: ['webdev', Validators.required],
      non_field_errors: [''],
      
    });

  }

  ngOnInit() { }


  
  public register() {

    let email = this.form.controls['email'].value;
    let username = this.form.controls['username'].value;
    let password1 = this.form.controls['password1'].value;
    let password2 = this.form.controls['password2'].value;
    this.form.controls['non_field_errors'].setValue('');
    this.authentificationService.register(email, username, password1, password2).subscribe(
      data => {
        this.notifierService.notifyWarn('Successful Registration,Please Validate your subscription in your mailbox', 0);
        this.router.navigate(['/login']);
      },
      error => {
        let restResponse = RestHelper.getRestResponse(error);
        if (!FormHelper.updateFormWithRestResponse(restResponse, this.form)) {
          this.notifierService.notifyError(String(restResponse.exception));
        }
      });
  }

}
