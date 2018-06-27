import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {SocialAccount} from '../../model/social-account.model';



declare var IN: any;

@Component({
  selector: 'app-login-linked-in',
  templateUrl: './login-linked-in.component.html',
  styleUrls: ['./login-linked-in.component.css']
})
export class LoginLinkedInComponent implements OnInit {

  @Output('signInChange')
  private signinChange = new EventEmitter<string>();

  public account: SocialAccount = new SocialAccount();

  @Input('clientId')
  private clientId: string;

  constructor(private ngZone: NgZone) {
    window['onLinkedInLoad'] = () => ngZone.run(() => this.onLinkedInLoad());
    window['onLinkedInDisplayProfiles'] = (profiles) => ngZone.run(() => this.onLinkedInDisplayProfiles(profiles));
    window['onLinkedInDisplayProfilesErrors'] = (error) => ngZone.run(() => this.onLinkedInDisplayProfilesErrors(error));
    window['onLinkedInSignInChanged'] = (access_token) => ngZone.run(() => this.onLinkedInSignInChanged(access_token));
    window['onLinkedInLogOut'] = () => ngZone.run(() => this.onLinkedInLogOut());
  }

  ngOnInit() {
    const script_linkedIn_frmk = document.getElementById('script_linkedIn_frmk');
    const script_linkedIn = document.getElementById('script_linkedIn');
    if (script_linkedIn_frmk) {
      script_linkedIn_frmk.remove();
    }
    if (script_linkedIn) {
      script_linkedIn.remove();
    }

    const linkedIn = document.createElement('script');
    linkedIn.id = 'script_linkedIn_frmk';
    linkedIn.type = 'text/javascript';
    linkedIn.src = 'https://platform.linkedin.com/in.js';
    linkedIn.innerHTML = '\n' +
      'api_key: ' + this.clientId + '\n' +
      'authorize: true\n' +
      'onLoad: onLinkedInLoad\n' +
      'scope: r_basicprofile r_emailaddress';
    document.head.appendChild(linkedIn);

    /*var linkedInDiv = document.createElement("div");
    linkedInDiv.id = "script_linkedIn" ;
    var script = document.createElement("script");
    script.type = "in/Login";
    linkedInDiv.appendChild(script);
    document.body.appendChild(linkedInDiv);
    */

  }

  /**
   *
   */
  public onLinkedInLoad() {
    // console.debug('onLinkedInLoad');
    IN.Event.on(IN, 'auth', this.onLinkedInProfile);
  }

  // Invoke login window
  public signIn() {
    if (IN.User) {
      IN.User.authorize(function () {
        this.onLinkedInSignInChanged(IN.ENV.auth.oauth_token);
      });
    }
  }

  public onLinkedInSignInChanged(access_token: string) {

    this.signinChange.next(access_token);
  }

  public onLinkedInProfile() {

    if (IN.ENV.auth && IN.ENV.auth.oauth_token) {
      IN.API.Profile('me')
        .fields('id', 'firstName', 'lastName', 'email-address', 'public-profile-url')
        .result(this.onLinkedInDisplayProfiles)
        .error(this.onLinkedInDisplayProfilesErrors);
    }
  }

  // Get the needed Data
  /* public getProfileData() {
       IN.API.Raw("/people/~:(id,email-address,first-name,last-name,formatted-name)")
           .result(this.displayProfiles)
           .error(this.displayProfilesErrors);
   }*/

  public onLinkedInDisplayProfiles = (profiles?: any) => {
    console.log(profiles);
    const  profil = profiles.values[0];
    // console.debug(JSON.stringify(profil));
    // console.debug(profil.firstName + ' ' + profil.lastName);

    this.account.id = profil.id;
    this.account.email = profil.emailAddress;
    this.account.firstName = profil.firstName;
    this.account.lastName = profil.lastName;
    this.account.profileUrl = profil.publicProfileUrl;

  }

  public onLinkedInDisplayProfilesErrors(error) {
    // console.debug(error);
  }

  public signOut(): void {
    IN.User.logout(function () {
      this.onLinkedInLogOut();
      // console.log('User signed out from linkedIn.');
    });
  }

  public onLinkedInLogOut(): void {
    this.account = new SocialAccount();
  }
}
