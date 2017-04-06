import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { AuthentificationService } from '../authentification.service'

import {  FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthentificationService]
})

export class LoginComponent implements OnInit {
   
    loading = false;
    returnUrl: string;

    public loginForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthentificationService,
        private notifierService: NotifierService,
        private _fb: FormBuilder) {

        this.loginForm = this._fb.group({
            username: ['webdev', Validators.required],
            password: ['webdev', Validators.required]
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
        this.authenticationService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
            .subscribe(
            data => {
                this.notifierService.notifySuccess('Successful connected', 2000);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.notifierService.notifyError(error);
                this.loading = false;
            });
    }
}
