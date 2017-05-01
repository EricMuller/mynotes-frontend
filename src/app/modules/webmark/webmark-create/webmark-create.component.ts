import { Component, OnInit } from '@angular/core';
import { Webmark } from '../model/webmark';
import { WebmarkService } from '../services/webmark.service';
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-webmark-create',
  templateUrl: './webmark-create.component.html',
  styleUrls: ['./webmark-create.component.css']
})
export class WebmarkCreateComponent implements OnInit {

  private note: Webmark;

  constructor(private noteService: WebmarkService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        let id = params['id'];
        if( id && id > 0) {
          this.noteService.findById(id).subscribe(note => this.note = note);
        }
    });
  }

  
  public keyupHandler(event){

  }

}
