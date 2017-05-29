import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { AuthentificationService } from '../authentification.service'

import {  FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import {NgForm} from '@angular/forms';

import { RestHelper } from 'app/modules/helpers/rest-helper';
import { FormHelper } from 'app/modules/helpers/form-helper';

// import fade in animation
import { fadeInAnimation } from 'app/shared/modules/animations/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthentificationService],
    animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class LoginComponent implements OnInit {
   
    loading = false;
    returnUrl: string;

    public form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthentificationService,
        private notifierService: NotifierService,
        private _fb: FormBuilder) {

        this.form = this._fb.group({
            username: ['webdev', Validators.required],
            password: ['webdev', Validators.required],
            non_field_errors: ['']
        });
    }


    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.form.controls['username'].value, this.form.controls['password'].value)
            .subscribe(
            data => {
                this.notifierService.notifySuccess('Successful connected', 2000);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                let restResponse = RestHelper.getRestResponse(error);
                if (!FormHelper.updateFormWithRestResponse(restResponse, this.form)) {
                    this.notifierService.notifyError(restResponse.exception);
                  }
                this.loading = false;
            });
    }
}
