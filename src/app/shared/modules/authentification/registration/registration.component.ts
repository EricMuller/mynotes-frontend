import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service'
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'
import { Registration } from 'app/shared/modules/authentification/model/registration.model'
import { Router, ActivatedRoute } from '@angular/router';
import { RestHelper } from 'app/modules/helpers/RestHelper';
import {  FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RestHelper]
})
export class RegistrationComponent implements OnInit {


  public registrationForm: FormGroup;


  constructor(private authentificationService: AuthentificationService,
    private notifierService: NotifierService,
    private router: Router,
    private _fb: FormBuilder) { 

      this.registrationForm = this._fb.group({
            email: ['t@free.fr', Validators.required],
            userName: ['t', Validators.required],
            password1: ['ttttttt', Validators.required],
            password2: ['tttttt', Validators.required]
        });
    }

  ngOnInit() {
  }

  public register() {

    let email = this.registrationForm.controls['email'].value;
    let userName = this.registrationForm.controls['userName'].value;
    let password1 = this.registrationForm.controls['password1'].value;
    let password2 = this.registrationForm.controls['password2'].value;

    this.authentificationService.register(email, userName, password1, password2).subscribe(
      data => {
        this.notifierService.notifySuccess('Successful Registration', 2000);
        this.router.navigate(['/login']);
      },
      error => {
          let  message = RestHelper.extractErrors(error);
          debugger
          this.notifierService.notifyError(message.exception);
      });
  }

}
