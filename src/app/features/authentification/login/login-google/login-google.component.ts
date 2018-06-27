import {AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {SocialAccount} from '../../model/social-account.model';


declare const gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements AfterViewInit {

  @Output()
  private signInChange = new EventEmitter<string>();

  public account = new SocialAccount();

  @Input('clientId')
  private clientId: string;

  private scope = [
    'profile',
    'email',
    /*'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'*/
  ].join(' ');

  public auth2: any;

  constructor(private ngZone: NgZone, private element: ElementRef) {
    window['onGoogleProfil'] = (user) => ngZone.run(() => this.onGoogleProfil(user));
    window['googleInitAuth'] = () => ngZone.run(() => this.googleInitAuth());
    window['onGoogleLogOut'] = () => ngZone.run(() => this.onGoogleLogOut());

    const  script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js?onload=googleInitAuth';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  /**
   * Google
   * @param googleUser
   */
  public onGoogleProfil(googleUser: any) {
    // console.debug('onGoogleLoad');
    const  profile = googleUser.getBasicProfile();
    const access_token = googleUser.getAuthResponse().access_token;
    this.account.access_token = access_token;
    this.account.id = profile.getId();
    this.account.email = profile.getEmail();
    this.account.firstName = profile.getGivenName();
    this.account.lastName = profile.getFamilyName();
    this.account.profileUrl = profile.getImageUrl();
  }

  /**
   *
   */
  public googleInitAuth() {
    console.debug('googleInit');
    const that = this;

    gapi.load('client:auth2', function () {
      // console.debug('gapi loaaded ');
      gapi.auth2.init({
        client_id: that.clientId,
        scope: 'profile email' // this isn't required
      }).then(function (auth2) {
        // console.debug('signed in: ' + auth2.isSignedIn.get());
        if (auth2.isSignedIn.get()) {
          that.onGoogleProfil(auth2.currentUser.get());
        }
      });
    });

  }

  public signOut(): void {
    const that = this;
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      auth2.signOut().then(function (authResult) {
        that.onGoogleLogOut();
      });
    }
  }

  public onGoogleLogOut(): void {
    console.log('User signed out.');
    this.account = new SocialAccount();
  }

  public signIn(): void {
    const that = this;
    if (this.account.access_token) {
      that.signInChange.next(that.account.access_token);
    } else {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(function (user) {
        that.onGoogleProfil(user);
        that.signInChange.next(that.account.access_token);
      });

    }
  }
}
