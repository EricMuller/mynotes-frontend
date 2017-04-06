import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import {  FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  @Input('control')
  private control:FormControl ;
  @Input() elm;

  constructor() { }

  ngOnInit() {
  }

}
