import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from '../../../core/notifications/notifier.service';
import {RestHelper} from '../../shared/helpers/rest-helper';
import {FormHelper} from '../../shared/helpers/form-helper';
import {fadeInAnimation} from '../../shared/animations/animations';
import {SocialAccount} from '../model/social-account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthentificationService],
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: {'[@fadeInAnimation]': ''}
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
          this.authenticationService.user().subscribe(user => {
            localStorage.setItem('webmarks_user', JSON.stringify(user));
            this.notifierService.notifySuccess('Successful connected with ' + application, 2000);
            this.router.navigate([this.returnUrl]);
            this.loading = false;
          });
        },
        error => {
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
          this.authenticationService.user().subscribe(user => {
            localStorage.setItem('webmarks_user', JSON.stringify(user));
            this.notifierService.notifySuccess('Successful connected', 2000);
            this.router.navigate([this.returnUrl]);
          });
        },
        error => {
          const restResponse = RestHelper.getRestResponse(error);
          if (!FormHelper.updateFormWithRestResponse(restResponse, this.form)) {
            this.notifierService.notifyError(restResponse.exception);
          }
          this.loading = false;
        });
  }
}
