import { Component, OnInit, NgZone, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { SocialAccount } from 'app/shared/modules/authentification/model/social-account.model'

declare const gapi: any;

@Component({
    selector: 'app-login-google',
    templateUrl: './login-google.component.html',
    styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements AfterViewInit {

    @Output('signInChange')
    private signinChange = new EventEmitter<string>();

    public account: SocialAccount = new SocialAccount();

    private clientId: string = '28025127281-bc876va0d6rvv0ltt6iflt8j4qrg033k.apps.googleusercontent.com';
    private scope = [
        'profile',
        'email',
        /*'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'*/
    ].join(' ');

    public auth2: any;

    constructor(private ngZone: NgZone, private element: ElementRef) {
        window['onGoogleLoad'] = (user) => ngZone.run(() => this.onGoogleLoad(user));
        //window['onGoogleAuth'] = (authInstance) => ngZone.run(() => this.onGoogleAuth(authInstance));
        window['userChanged'] = (authInstance) => ngZone.run(() => this.userChanged(authInstance));
        window['onGoogleLogOut'] = () => ngZone.run(() => this.onGoogleLogOut());

    }

    ngOnInit() {
        //<script src="https://apis.google.com/js/platform.js" async defer></script>

        /*var script = document.createElement("script");
        script.id = "script_linkedIn_frmk";
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/platform.js";
        document.head.appendChild(script);*/
    }

    /**
        * Google 
        * @param googleUser 
        */
    public onGoogleLoad(googleUser: any) {
        console.log('onGoogleLoad');
        console.debug(googleUser);
        var profile = googleUser.getBasicProfile();
        let access_token = googleUser.getAuthResponse().access_token;

        this.account.access_token = access_token;
        this.account.id = profile.getId();
        this.account.email = profile.getEmail();
        this.account.firstName = profile.getGivenName();
        this.account.lastName = profile.getFamilyName();
        this.account.url = profile.getImageUrl();

    }

    public googleInit() {
        console.log('googleInit');
        let that = this;
        this.auth2 = gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: that.clientId,
                scope: that.scope
            });
            // that.attachSignin(that.element.nativeElement.firstChild);
        });


    }

    public userChanged(user) {
        console.log('User now: ', user);
        //googleUser = user;
    }


    /*public onGoogleAuth(authInstance) {
        //this.auth2 = authInstance;
        console.log('onGoogleAuth');
        console.debug(authInstance);

        if (authInstance.isSignedIn.get()) {
            var profile = authInstance.currentUser.get().getBasicProfile();
            console.debug(profile);
        }

        // Sign the user in, and then retrieve their ID.
        authInstance.signIn().then(function () {
            console.log(gapi.auth2.currentUser.get().getId());
        });

    }*/
    /*
        public attachSignin(element) {
            let that = this;
            this.auth2.attachClickHandler(element, {},
                function (googleUser) {
    
                    let profile = googleUser.getBasicProfile();
                    console.log('Token || ' + googleUser.getAuthResponse().id_token);
                    console.log('ID: ' + profile.getId());
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail());
                    //YOUR CODE HERE
    
    
                }, function (error) {
                    console.log(JSON.stringify(error, undefined, 2));
                });
        }
    */

    public signOut(): void {
        var that = this;

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function (authResult) {
            this.onGoogleLogOut();
        });

    }

    public onGoogleLogOut(): void {
        console.log('User signed out.');
        this.account = new SocialAccount();
    }

    public signIn(): void {
        var that = this;
        if (this.account.access_token) {
            that.signinChange.next(this.account.access_token);
        } else {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signIn().then(function (user) {
                that.onGoogleLoad(user);
                that.signinChange.next(this.account.access_token);
            });

        }
    }

    ngAfterViewInit() {
        this.googleInit();
    }

}
