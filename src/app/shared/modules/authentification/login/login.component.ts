import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { AuthentificationService } from '../authentification.service'

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { RestHelper } from 'app/modules/helpers/rest-helper';
import { FormHelper } from 'app/modules/helpers/form-helper';

// import fade in animation
import { fadeInAnimation } from 'app/shared/modules/animations/animations';
import { SocialAccount } from 'app/shared/modules/authentification/model/social-account.model'

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

    public loading = false;
    public returnUrl: string;

    public socialAccounts: Array<SocialAccount> = [];

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
        this.socialAccounts = [];
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        /* var google = document.createElement("script");
         linkedIn.type = "text/javascript";
         linkedIn.src = "https://apis.google.com/js/platform.js";
          linkedIn.src = "http://platform.linkedin.com/in.js";
         linkedIn.innerHTML = "<meta name=""google-signin-scope"" content=""profile email"">" +
         "<meta name=""google-signin-client_id"" content=""28025127281-bc876va0d6rvv0ltt6iflt8j4qrg033k.apps.googleusercontent.com"">";
 */
    }

    public onLinkedIn(access_token: string) {
        console.log(access_token);
        this.loginSocial(access_token, 'linkedIn');
    }

    public onGoogle(access_token: string) {
        console.log(access_token);
        this.loginSocial(access_token, 'google');
    }

    /**
     * 
     * @param access_token 
     * @param application 
     */
    public loginSocial(access_token: string, application: string) {

        this.loading = true;
        this.authenticationService.loginSocial(access_token, application)
            .subscribe(
            data => {

                this.notifierService.notifySuccess('Successful connected with ' + application, 2000);
                this.router.navigate([this.returnUrl]);
                this.loading = false;
            },
            error => {
                //this.signOut();
                this.loading = false;
            });
    }


    /**
     * 
     */
    public login() {
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
