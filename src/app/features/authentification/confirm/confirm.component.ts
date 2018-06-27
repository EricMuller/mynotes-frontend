import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { NotifierService } from 'app/core/notifications/notifier.service'
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public form: FormGroup;
  private id :string;

  constructor(private notifierService: NotifierService,
        private _fb: FormBuilder, private route: ActivatedRoute, private router: Router
  ) {

     this.form = this._fb.group({
            username: ['webdev', Validators.required],
            password: ['webdev', Validators.required],
            non_field_errors: ['']
        });
      this.route.params.subscribe(params => {
          this.id = params['id'];
    });
  }

  ngOnInit() {
  }


  confirm(){
    this.notifierService.notifyInfo('SuccesFull validation for '+ this.id);
    this.router.navigate(['login']);

  }
}
